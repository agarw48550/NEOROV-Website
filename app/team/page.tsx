"use client";

import { useEffect, useRef, useState } from "react";
import { MemberPortrait } from "@/components/team/MemberPortrait";
import {
  acknowledgements,
  coreTeam,
  mediaTeam,
  supervisors,
  type TeamMember,
} from "@/content/team";

function MemberStage({
  member,
  index,
  active,
}: {
  member: TeamMember;
  index: number;
  active: boolean;
}) {
  return (
    <article
      className={`relative min-h-[100svh] overflow-hidden transition-opacity duration-700 ${
        active ? "opacity-100" : "opacity-40"
      }`}
    >
      <MemberPortrait member={member} priority={index === 0} />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-16 pt-28 md:px-10 md:pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-xs tracking-[0.3em] uppercase text-secondary">
            {String(index + 1).padStart(2, "0")} · {member.role}
          </p>
          <h2 className="mt-3 text-4xl tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {member.name}
          </h2>
          <p className="mt-2 text-sm tracking-wide text-accent md:text-base">
            {member.focus}
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-foreground/75 md:text-base">
            {member.bio}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function TeamPage() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { threshold: 0.55 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="bg-background">
      <section className="relative px-5 pb-10 pt-32 md:px-10 depth-gradient">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.28em] uppercase text-secondary">
            The crew
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl text-foreground md:text-6xl">
            Built underwater. Driven by four.
          </h1>
          <p className="mt-5 max-w-xl text-foreground/65">
            Engineering and ocean science — the core team behind Reef Monitoring
            ROV, and everyone who kept the mission afloat.
          </p>
        </div>
      </section>

      <div className="relative">
        {coreTeam.map((member, i) => (
          <div
            key={member.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
          >
            <MemberStage member={member} index={i} active={active === i} />
          </div>
        ))}
      </div>

      <section className="border-t border-white/5 px-5 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl text-foreground md:text-3xl">
            Collaborators & support
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-foreground/60">
            Mentors, media, families, and dive partners who made field work
            possible.
          </p>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-xs tracking-[0.22em] uppercase text-accent">
                Guiding supervisors
              </h3>
              <ul className="mt-4 space-y-3">
                {supervisors.map((p) => (
                  <li key={p.name} className="border-b border-white/5 pb-3">
                    <p className="text-foreground">{p.name}</p>
                    <p className="text-sm text-foreground/50">{p.role}</p>
                  </li>
                ))}
              </ul>
              <h3 className="mt-10 text-xs tracking-[0.22em] uppercase text-accent">
                Media
              </h3>
              <ul className="mt-4 space-y-3">
                {mediaTeam.map((p) => (
                  <li key={p.name} className="border-b border-white/5 pb-3">
                    <p className="text-foreground">{p.name}</p>
                    <p className="text-sm text-foreground/50">{p.role}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs tracking-[0.22em] uppercase text-accent">
                Acknowledgements
              </h3>
              <ul className="mt-4 columns-1 gap-x-8 sm:columns-2">
                {acknowledgements.map((p) => (
                  <li key={p.name} className="mb-3 break-inside-avoid">
                    <p className="text-sm text-foreground">{p.name}</p>
                    <p className="text-xs text-foreground/45">{p.role}</p>
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
