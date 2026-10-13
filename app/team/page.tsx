import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  acknowledgements,
  coreTeam,
  supervisors,
} from "@/content/team";

export default function TeamPage() {
  return (
    <div className="bg-background">
      <section className="page-hero relative overflow-hidden depth-gradient">
        <div className="pointer-events-none absolute inset-0 caustics opacity-25" />
        <div className="page-container relative">
          <SectionHeader
            animateOnMount
            titleAs="h1"
            eyebrow="The crew"
            title="Built by Youth for the Ocean"
            description="Engineering and ocean science, from the core team behind Reef Monitoring ROV and everyone who supported field work."
            titleClassName="max-w-3xl text-display-lg md:text-[clamp(2.25rem,5vw,3.75rem)]"
          />
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="page-container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {coreTeam.map((member, i) => (
              <article
                key={member.id}
                className="group"
              >
                <div className="card-media relative aspect-[3/4] transition-[border-color] duration-300 group-hover:border-[color-mix(in_srgb,var(--secondary)_35%,transparent)]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    priority={i < 2}
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030d14] via-[#030d14]/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-eyebrow text-[0.65rem] tracking-[0.18em]">
                      {String(i + 1).padStart(2, "0")} · {member.role}
                    </p>
                    <h2 className="font-display text-h3 mt-2 text-foreground">
                      {member.name}
                    </h2>
                    <p className="text-body-sm mt-1 text-foreground/55">{member.focus}</p>
                  </div>
                </div>
                <p className="text-body-sm mt-4 text-foreground/65">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-white/5">
        <div className="page-container">
          <h2 className="font-display text-display-md text-foreground">
            Collaborators & Support
          </h2>
          <p className="text-body-sm mt-4 max-w-2xl text-foreground/60">
            Mentors, families, and dive partners who made field work possible.
          </p>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-eyebrow text-accent">Guiding Supervisors</h3>
              <ul className="mt-4 space-y-4">
                {supervisors.map((p) => (
                  <li key={p.name} className="border-b border-white/5 pb-4">
                    <p className="text-foreground">{p.name}</p>
                    <p className="text-body-sm text-foreground/50">{p.role}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-eyebrow text-accent">Acknowledgements</h3>
              <ul className="mt-4 columns-1 gap-x-8 sm:columns-2">
                {acknowledgements.map((p) => (
                  <li key={p.name} className="mb-4 break-inside-avoid">
                    <p className="text-body-sm text-foreground">{p.name}</p>
                    <p className="text-[0.75rem] text-foreground/45">{p.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
