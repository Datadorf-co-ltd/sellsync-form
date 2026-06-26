import { Metadata } from "next";
import InterestForm from "@/components/InterestForm";

export const metadata: Metadata = {
  title: "ฟอร์มผู้สนใจใช้งาน Sellsync | Datadorf",
  description: "กรอกข้อมูลเพื่อให้เราติดต่อกลับ — SellSync โดย Datadorf",
};

export default function FormPage() {
  return <InterestForm />;
}
