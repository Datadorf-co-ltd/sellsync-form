"use server";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { formSchema, type FormValues } from "@/lib/schema";

type ActionResult =
  | { success: true }
  | { success: false; error: string };

function textSplitPosition(positionText: string) {
  if (positionText === "") return;

  const sep = positionText.includes("/") ? "/" : positionText.includes(",") ? "," : null;
  if (!sep) return { position: positionText.trim(), company: "" };

  const parts = positionText.split(sep);
  return {
    position: parts[0].trim(),
    company:  parts.slice(1).join(sep).trim(),
  };
}

export async function submitInterestForm(data: FormValues): Promise<ActionResult> {
  const parsed = formSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง" };
  }

  const splitCompany = textSplitPosition(parsed.data.position);
  
  const {
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY,
    GOOGLE_SPREADSHEET_ID,
  } = process.env;

  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SPREADSHEET_ID) {
    console.error("Missing Google Sheets environment variables");
    return { success: false, error: "เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่ภายหลัง" };
  }

  try {
    const jwt = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_ID, jwt);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();
    const emailExists = rows.some(
      (row) => row.get("อีเมล")?.trim().toLowerCase() === parsed.data.email.toLowerCase()
    );
    if (emailExists) {
      return { success: false, error: "อีเมลนี้ถูกลงทะเบียนแล้ว" };
    }

    const phoneExists = rows.some(
      (row) => row.get("เบอร์โทรศัพท์")?.replace(/\D/g, "") === parsed.data.phone.replace(/\D/g, "")
    );
    if (phoneExists) {
      return { success: false, error: "เบอร์โทรศัพท์นี้ถูกลงทะเบียนแล้ว" };
    }

    await sheet.addRow({
      "ชื่อ-นามสกุล":    parsed.data.fullName,
      "ตำแหน่ง": splitCompany?.position ?? parsed.data.position,
      "บริษัท": splitCompany?.company ?? "",
      "อีเมล":           parsed.data.email,
      "เบอร์โทรศัพท์":  parsed.data.phone,
      "Line ID":         parsed.data.lineId ?? "",
      "วันที่สมัคร":     new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" }),
    });

    return { success: true };
  } catch (err) {
    console.error("Google Sheets error:", err);
    return { success: false, error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง" };
  }
}
