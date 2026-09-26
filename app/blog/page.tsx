import Link from "next/link";
import { blogCategories, seeingTheUnseen } from "@/content/blog";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <div className="depth-gradient min-h-screen">
      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-24">
        <div className="pointer-events-none absolute inset-0 caustics opacity-50" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.28em] uppercase text-secondary">
            Journal
          </p>
          <h1 className="font-display mt-3 text-4xl text-foreground md:text-6xl">Blog</h1>
          <p className="mt-4 max-w-xl text-foreground/65">
            Field notes, mission essays, and space for marine technology and
            Singapore ecology writing still to come.
          </p>
        </div>
      </section>

      <section className="relative px-5 pb-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href={`/blog/${seeingTheUnseen.slug}`}
            className="group relative block overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/field/tioman-04.jpg"
                alt=""
                className="h-full w-full object-cover opacity-35 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-45"
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_srgb,#0a1628_88%,transparent),color-mix(in_srgb,#041018_70%,transparent))]" />
            </div>
            <div className="pointer-events-none absolute inset-0 caustics opacity-40" />
            <div className="relative grid gap-8 px-6 py-14 md:grid-cols-[1.2fr_0.8fr] md:px-12 md:py-20">
              <div>
                <p className="text-xs tracking-[0.22em] uppercase text-accent">
                  Featured · {seeingTheUnseen.category}
                </p>
                <h2 className="font-display mt-4 text-3xl text-foreground transition group-hover:text-secondary md:text-5xl">
                  {seeingTheUnseen.title}
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/70 md:text-base">
                  {seeingTheUnseen.excerpt}
                </p>
                <span className="mt-8 inline-block text-sm text-secondary">
                  Read the essay →
                </span>
              </div>
              <div className="flex items-end justify-end">
                <p className="text-right text-xs tracking-[0.2em] uppercase text-foreground/40">
                  {seeingTheUnseen.date}
                  <br />
                  Mission essay
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="border-t border-white/5 px-5 py-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl text-foreground">Coming series</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {blogCategories.map((cat) => (
              <div
                key={cat.id}
                className="border border-dashed border-white/15 px-6 py-10"
              >
                <p className="text-xs tracking-[0.2em] uppercase text-primary">
                  Coming soon
                </p>
                <h3 className="mt-3 text-xl text-foreground">{cat.title}</h3>
                <p className="mt-3 text-sm text-foreground/55">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
