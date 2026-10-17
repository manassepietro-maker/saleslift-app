import { BuyButton } from "@/components/BuyButton";
import { Reveal } from "@/components/landing/Reveal";
import { PRICE_LABEL } from "@/lib/content/landing";

// Closing call to action shared by the detail pages.
export function PageCta({ title }: { title: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-t border-line px-5 py-24 text-center sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(50%_100%_at_50%_100%,rgba(43,123,246,0.28),transparent)]" />
      <Reveal className="relative mx-auto max-w-3xl">
        <h2 className="mb-8 text-[34px] font-extrabold leading-[1.1] tracking-tight sm:text-[48px]">{title}</h2>
        <BuyButton label={`Get the course · ${PRICE_LABEL}`} />
        <p className="mt-5 text-[15px] text-fg-faint">One payment · lifetime access</p>
      </Reveal>
    </section>
  );
}
