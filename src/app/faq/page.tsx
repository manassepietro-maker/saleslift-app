import type { Metadata } from "next";
import { Reveal } from "@/components/landing/Reveal";
import { SiteHeader, SiteFooter, Eyebrow, Check, Cross } from "@/components/landing/Site";
import { PageCta } from "@/components/landing/PageCta";
import { Faq } from "@/components/landing/Visuals";
import { FAQ, FOR, NOT_FOR } from "@/lib/content/landing";

export const metadata: Metadata = { title: "FAQ | SalesLift" };

export default function FaqPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-bg text-fg">
      <SiteHeader />

      <section className="px-5 pb-20 pt-16 sm:px-8 lg:pt-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h1 className="mb-12 text-[40px] font-extrabold leading-[1.05] tracking-tight sm:text-[58px]">
              Straight answers.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <Faq items={FAQ} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-[#18191c] px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <Reveal from="left">
            <div
              className="h-full border border-green/40 p-8 sm:p-10"
              style={{ background: "linear-gradient(150deg, rgba(34,176,125,0.16), #212226 60%)" }}
            >
              <h2 className="mb-7 text-[24px] font-bold">This is for you if:</h2>
              <ul className="flex flex-col gap-5">
                {FOR.map((f) => (
                  <li key={f} className="flex gap-4 text-[17px] leading-relaxed text-fg">
                    <Check color="#22b07d" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal from="right" delay={150}>
            <div className="h-full border border-line bg-bg-alt p-8 sm:p-10">
              <h2 className="mb-7 text-[24px] font-bold text-fg-dim">This isn&apos;t for you if:</h2>
              <ul className="flex flex-col gap-5">
                {NOT_FOR.map((f) => (
                  <li key={f} className="flex gap-4 text-[17px] leading-relaxed text-fg-faint">
                    <Cross />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <PageCta title={<>Ready when <span className="text-accent">you are.</span></>} />
      <SiteFooter />
    </main>
  );
}
