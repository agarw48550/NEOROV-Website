import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { blogCategories, seeingTheUnseen } from "@/content/blog";

export const metadata = {
  title: "Blog",
  description:
    "Field notes and mission essays from the Reef Monitoring ROV team on reef ecology, engineering, and operations in Singapore waters.",
};

export default function BlogPage() {
  return (
    <div className="depth-gradient min-h-screen">
      <section className="page-hero relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 caustics opacity-25" />
        <div className="page-container relative">
          <SectionHeader
            titleAs="h1"
            eyebrow="Journal"
            title="Blog"
            description="Field notes, mission essays, and upcoming writing on marine technology and Singapore reef ecology."
            titleClassName="text-display-lg md:text-[clamp(2.25rem,5vw,3.75rem)]"
          />
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="page-container">
          <Link
            href={`/blog/${seeingTheUnseen.slug}`}
            className="group card-media relative block border border-white/10 transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--secondary)_40%,transparent)]"
          >
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/field/tioman-04.jpg"
                alt=""
                className="h-full w-full object-cover opacity-30 transition duration-500 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/92 to-[#041018]/80" />
            </div>
            <div className="relative grid gap-8 px-6 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-12 md:py-16">
              <div>
                <p className="text-eyebrow text-accent">
                  Featured · {seeingTheUnseen.category}
                </p>
                <h2 className="font-display text-display-md mt-4 text-foreground transition-colors duration-300 group-hover:text-secondary">
                  {seeingTheUnseen.title}
                </h2>
                <p className="text-body-sm mt-4 max-w-xl text-foreground/70">
                  {seeingTheUnseen.excerpt}
                </p>
                <span className="text-body-sm mt-8 inline-block text-secondary">
                  Read the essay →
                </span>
              </div>
              <div className="flex items-end justify-end">
                <p className="text-right text-eyebrow text-[0.65rem] text-foreground/45">
                  {seeingTheUnseen.date}
                  <br />
                  Mission essay
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="section-y border-t border-white/5">
        <div className="page-container">
          <h2 className="font-display text-display-md text-foreground">Coming Series</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {blogCategories.map((cat) => (
              <div
                key={cat.id}
                className="card-media border border-dashed border-white/15 px-6 py-8"
              >
                <p className="text-eyebrow text-primary">Coming soon</p>
                <h3 className="font-display text-h3 mt-4 text-foreground">{cat.title}</h3>
                <p className="text-body-sm mt-4 text-foreground/55">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
