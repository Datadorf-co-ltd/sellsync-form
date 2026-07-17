import { Metadata } from "next";
import InterestForm from "@/components/InterestForm";

export const metadata: Metadata = {
  title: "ฟอร์มผู้สนใจใช้งาน Mydorf | Datadorf",
  description: "กรอกข้อมูลเพื่อให้เราติดต่อกลับ — Mydorf โดย Datadorf",
};

export default async function FormPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;
  return <InterestForm openTrial={t === "trial"} />;
}
