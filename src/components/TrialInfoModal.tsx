"use client";

import { Gift } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type TrialInfoModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const STEPS = [
  {
    title: "สมัครบัญชี",
    detail: (
      <>
        สมัครบัญชีที่{" "}
        <a
          href="https://mydorf.com/register"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:text-primary/80 font-medium"
        >
          mydorf.com/register
        </a>
      </>
    ),
  },
  {
    title: "กรอกฟอร์ม",
    detail: "กรอกข้อมูลในฟอร์มผู้สนใจให้ครบถ้วน",
  },
  {
    title: "รอปรับ Package",
    detail: "ทีมงานจะปรับ Package ทดลองใช้ให้กับบัญชีของคุณ",
  },
];

export default function TrialInfoModal({ open, onOpenChange }: TrialInfoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mx-4 sm:mx-0">
        <DialogHeader>
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-50 text-primary mb-1">
            <Gift className="w-5 h-5" />
          </div>
          <DialogTitle>ทดลองใช้งานฟรี 14 วัน</DialogTitle>
          <DialogDescription>
            เริ่มต้นใช้งาน SellSync ได้ทันที ไม่มีค่าใช้จ่ายในช่วงทดลอง
          </DialogDescription>
        </DialogHeader>

        <DialogBody className="text-sm text-foreground leading-relaxed space-y-5">
          <section>
            <h3 className="font-semibold text-foreground mb-3">ขั้นตอนการลงทะเบียนทดลองใช้</h3>
            <ol className="space-y-4">
              {STEPS.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-none flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    {i + 1}
                  </span>
                  <div className="pt-0.5">
                    <p className="font-medium text-foreground">{step.title}</p>
                    <p className="text-muted-foreground">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="rounded-lg border border-brand-100 bg-brand-50/60 p-4">
            <p className="text-sm text-foreground">
              <span className="font-semibold text-primary">*แนะนำ</span>{" "}
              อีเมลที่ใช้สมัครบัญชี ควรเป็นอีเมลเดียวกันกับที่กรอกในฟอร์ม
              เพื่อให้ทีมงานปรับ Package ให้ได้อย่างถูกต้อง
            </p>
          </div>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="default" size="sm">
              รับทราบและปิด
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
