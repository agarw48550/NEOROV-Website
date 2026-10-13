import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  ghost: "btn btn-ghost",
};

/** Primary navigation actions with shared padding, radius, and hover behavior. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: Props) {
  return (
    <Link href={href} className={`${variantClass[variant]} ${className}`.trim()} {...rest}>
      {children}
    </Link>
  );
}
