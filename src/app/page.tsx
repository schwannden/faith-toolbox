import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          src="/logo.png"
          alt="Faith Toolbox logo"
          width={360}
          height={76}
          priority
        />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button
            asChild
            variant="default"
            className="rounded-full text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            <Link
              className="flex items-center gap-2"
              href="/apps/bible-reading-calendar"
            >
              Bible Reading Calendar Generator
            </Link>
          </Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn Next JS
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/wanlong-church/prayer-blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            aria-hidden
            src="/github.svg"
            alt="Github icon"
            width={16}
            height={16}
          />
          Contribute
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://discord.gg/SWRHyas2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/discord.svg"
            alt="Discord icon"
            width={16}
            height={16}
          />
          Join the community at Discord →
        </a>
      </footer>
    </div>
  );
}
