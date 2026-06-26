"use client";

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

type PdpaModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function PdpaModal({ open, onOpenChange }: PdpaModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mx-4 sm:mx-0">
        <DialogHeader>
          <DialogTitle>นโยบายความเป็นส่วนตัว (PDPA)</DialogTitle>
          <DialogDescription>
            บริษัท ดาต้าดอร์ฟ จำกัด — อัปเดตล่าสุด มิถุนายน 2568
          </DialogDescription>
        </DialogHeader>

        <DialogBody className="text-sm text-foreground leading-relaxed space-y-4">
          <section>
            <h3 className="font-semibold text-foreground mb-1">1. วัตถุประสงค์การเก็บข้อมูล</h3>
            <p className="text-muted-foreground">
              บริษัท ดาต้าดอร์ฟ จำกัด ("บริษัท") เก็บรวบรวมข้อมูลส่วนบุคคลของท่านเพื่อวัตถุประสงค์
              ในการติดต่อกลับ นำเสนอผลิตภัณฑ์ SellSync และให้บริการที่เกี่ยวข้องแก่ท่าน
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-1">2. ข้อมูลที่เก็บรวบรวม</h3>
            <ul className="text-muted-foreground list-disc list-inside space-y-1">
              <li>ชื่อ-นามสกุล</li>
              <li>ตำแหน่งและชื่อบริษัทที่สังกัด</li>
              <li>อีเมลและเบอร์โทรศัพท์</li>
              <li>Line ID (หากให้ไว้)</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-1">3. การใช้ข้อมูล</h3>
            <p className="text-muted-foreground">
              บริษัทจะใช้ข้อมูลของท่านเพื่อ (1) ติดต่อกลับตามที่ท่านร้องขอ (2) นำเสนอข้อมูล
              ผลิตภัณฑ์และบริการ (3) ปรับปรุงคุณภาพการให้บริการ บริษัทจะไม่นำข้อมูลของท่าน
              ไปขายหรือเปิดเผยแก่บุคคลภายนอกโดยไม่ได้รับความยินยอม
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-1">4. ระยะเวลาการเก็บข้อมูล</h3>
            <p className="text-muted-foreground">
              บริษัทจะเก็บรักษาข้อมูลส่วนบุคคลของท่านไว้เป็นระยะเวลาไม่เกิน 3 ปี
              นับแต่วันที่ท่านให้ความยินยอม หรือจนกว่าท่านจะขอถอนความยินยอม
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-1">5. สิทธิ์ของเจ้าของข้อมูล</h3>
            <p className="text-muted-foreground">
              ท่านมีสิทธิ์เข้าถึง แก้ไข ลบ หรือขอถอนความยินยอมในการใช้ข้อมูลส่วนบุคคลได้ทุกเมื่อ
              โดยติดต่อมาที่ <span className="text-primary font-medium">privacy@datadorf.co.th</span>
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-1">6. การรักษาความปลอดภัย</h3>
            <p className="text-muted-foreground">
              บริษัทใช้มาตรการทางเทคนิคและการบริหารจัดการที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคล
              ของท่านจากการเข้าถึงโดยไม่ได้รับอนุญาต การสูญหาย หรือการเปิดเผยโดยมิชอบ
            </p>
          </section>
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
