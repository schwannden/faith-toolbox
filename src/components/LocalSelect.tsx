"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";

import { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { setUserLocale } from "@/services/locale";
import { useTransition } from "react";

export default function LocalSelect() {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("language");
  const locale = useLocale();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }
  return (
    <Select onValueChange={onChange} defaultValue={locale}>
      <SelectTrigger
        className={cn("w-[180px]", {
          "pointer-events-none opacity-60": isPending,
        })}
      >
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="zh-TW">{t("zh-TW")}</SelectItem>
        <SelectItem value="en">{t("en")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
