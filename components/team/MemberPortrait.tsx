"use client";

import Image from "next/image";
import { useState } from "react";
import type { TeamMember } from "@/content/team";

export function MemberPortrait({
  member,
  priority = false,
}: {
  member: TeamMember;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const isSvg = member.image.endsWith(".svg");
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="absolute inset-0 bg-[#121c32]">
      {!failed ? (
        isSvg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt={member.name}
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={() => setFailed(true)}
          />
        ) : (
          <Image
            src={member.image}
            alt={member.name}
            fill
            priority={priority}
            className="object-cover object-center"
            sizes="100vw"
            onError={() => setFailed(true)}
          />
        )
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_40%_30%,color-mix(in_srgb,var(--secondary)_28%,transparent),transparent_55%),linear-gradient(160deg,#0f1729,#1a2744)]">
          <span className="text-7xl tracking-[0.2em] text-secondary/40 md:text-9xl">
            {initials}
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729] via-[#0f1729]/55 to-[#0f1729]/20" />
      <div className="absolute inset-0 caustics opacity-30 mix-blend-screen" />
    </div>
  );
}
