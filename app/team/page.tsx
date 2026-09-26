"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  acknowledgements,
  coreTeam,
  mediaTeam,
  supervisors,
} from "@/content/team";

export default function TeamPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden px-5 pb-14 pt-32 md:px-10 depth-gradient">
        <div className="pointer-events-none absolute inset-0 caustics opacity-45" />
        <div className="relative mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.28em] uppercase text-secondary"
          >
            The crew
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display mt-3 max-w-3xl text-4xl leading-tight text-foreground md:text-6xl"
          >
            Built for the water by the four.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 max-w-xl text-foreground/65"
          >
            Engineering and ocean science — the core team behind Reef Monitoring
            ROV, and everyone who kept the mission afloat.
          </motion.p>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coreTeam.map((member, i) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#121c32]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  priority={i < 2}
                  className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041018] via-[#041018]/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-secondary">
                    {String(i + 1).padStart(2, "0")} · {member.role}
                  </p>
                  <h2 className="font-display mt-1 text-2xl text-foreground">
                    {member.name}
                  </h2>
                  <p className="mt-1 text-xs text-accent">{member.focus}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                {member.bio}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 px-5 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl text-foreground md:text-3xl">
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
