"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
} as const;

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Use h1 on page heroes only */
  titleAs?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
  animateOnMount?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  titleAs = "h2",
  className = "",
  titleClassName = "",
  animateOnMount = false,
}: Props) {
  const TitleTag = titleAs === "h1" ? motion.h1 : motion.h2;
  const eyebrowMotion = animateOnMount
    ? {
        initial: fadeUp.initial,
        animate: fadeUp.whileInView,
        transition: fadeUp.transition,
      }
    : {};

  return (
    <div className={className}>
      <motion.p {...eyebrowMotion} className="text-eyebrow">
        {eyebrow}
      </motion.p>
      <TitleTag
        {...(animateOnMount
          ? {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { ...fadeUp.transition, delay: 0.06 },
            }
          : {})}
        className={`font-display text-display-md mt-4 text-foreground ${titleClassName}`}
      >
        {title}
      </TitleTag>
      {description ? (
        <motion.p
          {...(animateOnMount
            ? {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { ...fadeUp.transition, delay: 0.12 },
              }
            : {})}
          className="text-body mt-4 max-w-xl text-foreground/70"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
