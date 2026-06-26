import { z } from "zod";

export const formSchema = z.object({
  fullName:    z.string().min(1, "กรุณากรอกชื่อ-นามสกุล"),
  position:    z.string().min(1, "กรุณากรอกตำแหน่ง/บริษัท"),
  email:       z.string().min(1, "กรุณากรอกอีเมล").email("รูปแบบอีเมลไม่ถูกต้อง"),
  phone:       z.string().min(1, "กรุณากรอกเบอร์โทรศัพท์").regex(/^[0-9+\-\s()]{9,15}$/, "รูปแบบเบอร์โทรไม่ถูกต้อง"),
  lineId:      z.string().optional(),
  pdpaAccepted: z.boolean().refine((val) => val === true, {
    message: "กรุณายอมรับนโยบายความเป็นส่วนตัวก่อนส่งข้อมูล",
  }),
});

export type FormValues = z.infer<typeof formSchema>;

export type FieldConfig = {
  name: Exclude<keyof FormValues, "pdpaAccepted">;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
  description?: string;
};

export const FIELDS: FieldConfig[] = [
  {
    name:        "fullName",
    label:       "ชื่อ-นามสกุล",
    placeholder: "เช่น สมชาย ใจดี",
    type:        "text",
    required:    true,
  },
  {
    name:        "position",
    label:       "ตำแหน่ง/บริษัท",
    placeholder: "เช่น ผู้จัดการฝ่ายขาย, บริษัท ABC จำกัด",
    type:        "text",
    required:    true,
  },
  {
    name:        "email",
    label:       "อีเมล",
    placeholder: "your@email.com",
    type:        "email",
    required:    true,
  },
  {
    name:        "phone",
    label:       "เบอร์โทรศัพท์",
    placeholder: "เช่น 089-123-4567",
    type:        "tel",
    required:    true,
  },
  {
    name:        "lineId",
    label:       "Line ID",
    placeholder: "เช่น @mylineid",
    type:        "text",
    required:    false,
    description: "ไม่บังคับ",
  },
];
