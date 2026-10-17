import type { Metadata } from "next";
import { Reveal } from "@/components/landing/Reveal";
import { SiteHeader, SiteFooter, Eyebrow } from "@/components/landing/Site";
import { PageCta } from "@/components/landing/PageCta";
import { ApplicationsGrid, CallbackChart, InboxMock } from "@/components/landing/Visuals";
import { ContentBlocks } from "@/components/ContentBlocks";
import { INTRO } from "@/lib/content/modules";
import { INBOX } from "@/lib/content/landing";

export const metadata: Metadata = { title: "My story | SalesLift" };

// Founder story. The text is the same as the course's "Why this course
// exists" lesson (INTRO in modules.ts), so it only needs editing in one place.
export default function StoryPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-bg text-fg">
      <SiteHeader />

      <section className="px-5 pb-20 pt-16 sm:px-8 lg:pt-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Eyebrow>My story</Eyebrow>
            <h1 className="mb-6 text-[40px] font-extrabold leading-[1.05] tracking-tight sm:text-[58px]">
              Hundreds of applications. <span className="text-accent">Two interviews.</span>
            </h1>
            <p className="text-[19px] leading-relaxed text-fg-dim">
              AE experience at Gartner, a track record of overachieving on target, and the job hunt still didn&apos;t
              work. Here&apos;s what happened, and what I built because of it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.3fr_1fr] [&>*]:min-w-0">
          <Reveal>
            <ContentBlocks blocks={INTRO.body} />
          </Reveal>
          <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
            <ApplicationsGrid />
            <CallbackChart />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-[#18191c] px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 [&>*]:min-w-0">
          <Reveal>
            <Eyebrow color="#22b07d">Six weeks from now</Eyebrow>
            <h2 className="mb-6 text-[34px] font-extrabold leading-[1.05] tracking-tight sm:text-[48px]">
              Picture the inbox <span className="text-green">that&apos;s waiting.</span>
            </h2>
            <p className="text-[18px] leading-relaxed text-fg-dim">
              Six weeks from now you could still be refreshing your inbox waiting on the same three companies, or already
              deciding between two offers.
            </p>
          </Reveal>
          <InboxMock emails={INBOX} />
        </div>
      </section>

      <PageCta title={<>Your search doesn&apos;t have to <span className="text-accent">look like mine did.</span></>} />
      <SiteFooter />
    </main>
  );
}
