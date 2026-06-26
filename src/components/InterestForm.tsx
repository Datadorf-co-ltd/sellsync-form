"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { formSchema, FIELDS, type FormValues } from "@/lib/schema";
import { submitInterestForm } from "@/app/form/actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PdpaModal from "@/components/PdpaModal";

export default function InterestForm() {
  const [pdpaOpen, setPdpaOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName:     "",
      position:     "",
      email:        "",
      phone:        "",
      lineId:       "",
      pdpaAccepted: false,
    },
  });

  const { isSubmitting } = form.formState;
  const pdpaAccepted = useWatch({ control: form.control, name: "pdpaAccepted" });

  async function onSubmit(values: FormValues) {
    const result = await submitInterestForm(values);
    if (result.success) {
      toast.success("ส่งข้อมูลสำเร็จ!", {
        description: "เราจะติดต่อกลับหาคุณโดยเร็วที่สุด",
      });
      form.reset();
    } else {
      toast.error("เกิดข้อผิดพลาด", {
        description: result.error,
      });
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-brand-50 via-background to-brand-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 shadow-lg shadow-brand-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo.png" alt="Datadorf" className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            ฟอร์มผู้สนใจใช้งาน Sellsync
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            กรอกข้อมูลด้านล่าง เราจะติดต่อกลับภายหลัง
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl border border-brand-100 shadow-md shadow-brand-100/60 p-6 sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

              {FIELDS.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: rhfField }) => (
                    <FormItem>
                      <FormLabel className="pl-2">
                        {field.label}
                        {field.required && (
                          <span className="ml-1 text-destructive">*</span>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...rhfField}
                          type={field.type}
                          placeholder={field.placeholder}
                          disabled={isSubmitting}
                          value={rhfField.value ?? ""}
                        />
                      </FormControl>
                      {field.description && (
                        <FormDescription className="pl-2">{field.description}</FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {/* PDPA */}
              <FormField
                control={form.control}
                name="pdpaAccepted"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox
                          id="pdpa"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                          className="mt-0.5"
                        />
                      </FormControl>
                      <label htmlFor="pdpa" className="text-sm text-muted-foreground leading-snug cursor-pointer select-none">
                        ฉันยอมรับ{" "}
                        <button
                          type="button"
                          onClick={() => setPdpaOpen(true)}
                          className="text-primary underline underline-offset-2 hover:text-primary/80 font-medium"
                        >
                          นโยบายความเป็นส่วนตัว (PDPA)
                        </button>
                        {" "}และยินยอมให้เก็บข้อมูลส่วนบุคคล
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className={`mt-2 w-full ${isSubmitting || !pdpaAccepted ? "cursor-not-allowed" : "cursor-pointer"}`}
                disabled={isSubmitting || !pdpaAccepted}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    กำลังส่งข้อมูล...
                  </>
                ) : (
                  "ส่งข้อมูล"
                )}
              </Button>

            </form>
          </Form>
        </div>

        <PdpaModal open={pdpaOpen} onOpenChange={setPdpaOpen} />

        {/* <p className="mt-6 text-center text-xs text-muted-foreground">
          ข้อมูลของคุณจะถูกเก็บรักษาเป็นความลับ
        </p> */}
      </div>
    </div>
  );
}
