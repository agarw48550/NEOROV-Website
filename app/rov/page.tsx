import type { Metadata } from "next";
import { RovPageClient } from "./RovPageClient";

export const metadata: Metadata = {
  title: "The ROV",
  description:
    "Explore the Reef Monitoring ROV — open PVC frame, acrylic capsule, T200 thrusters, sensors, and tether.",
};

export default function RovPage() {
  return <RovPageClient />;
}
