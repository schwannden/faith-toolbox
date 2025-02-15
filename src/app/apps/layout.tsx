import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AppsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations("app");
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        {children}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 w-fit hover:underline hover:underline-offset-4"
        >
          <Image
            src="/window.svg"
            alt="Home"
            width={16}
            height={16}
            className="dark:invert"
          />
          {t("footer.back-to-home")}
        </Link>
      </footer>
    </div>
  );
}
