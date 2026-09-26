export const problemStatement = {
  eyebrow: "The problem",
  title: "You can’t protect what you can’t see",
  body: "Singapore’s waters hold roughly 255 species of hard coral — nearly a third of the world’s total — packed into a tiny area. Since 1953, more than 60% of that cover has been lost. Visibility often drops to less than an arm’s length, and divers alone can’t keep pace with the reefs that remain.",
};

export const dualPaths = [
  {
    id: "vehicle",
    eyebrow: "The vehicle",
    title: "Explore the ROV",
    body: "An open-frame research tool: live video, depth and temperature logging, deployable from shore.",
    href: "/rov",
    cta: "Inspect the systems",
  },
  {
    id: "crew",
    eyebrow: "The crew",
    title: "Meet the four",
    body: "Built for the water by a four-person team at UWCSEA East — engineering meets ocean science.",
    href: "/team",
    cta: "Meet the team",
  },
] as const;

export const capabilityPillars = [
  {
    word: "SEE",
    body: "Live 1080p video through murky coastal water — the first step to protecting a reef you can’t walk on.",
  },
  {
    word: "MEASURE",
    body: "Depth, pressure, and temperature logged with every transect so abiotic context travels with the footage.",
  },
  {
    word: "REACH",
    body: "Shore- or boat-deployable at ~5.9 kg and about $1,500 — research access without a support vessel.",
  },
] as const;

export const filmstripPhotos = [
  "/images/rov/underwater-action.jpg",
  "/images/rov/gopro-poolside.jpg",
  "/images/rov/gopro-deploy.jpg",
  "/images/rov/onboard-electronics.jpg",
  "/images/rov/poolside-rov-web.jpg",
  "/images/rov/gopro-surface.jpg",
  "/images/rov/underwater-rov.jpg",
  "/images/rov/onboard-wiring.jpg",
  "/images/rov/gopro-hull.jpg",
  "/images/rov/team-field.jpg",
  "/images/rov/gopro-waterline.jpg",
  "/images/rov/onboard-capsule.jpg",
];

/** Two scroll story beats — crisis → solution */
export const reefStoryBeats = [
  {
    id: "crisis",
    eyebrow: "Heat & loss",
    title: "Reefs are living cities under pressure",
    body: "Warm the sea by 1.5–2 °C and polyps expel their algae — bleaching. Over 84% of the world’s reefs face heat stress. Reefs cover under 1% of the ocean floor yet support about 1 in 4 marine species.",
    visual: "crisis" as const,
    image: "/images/rov/hantu-reef.jpg",
  },
  {
    id: "solution",
    eyebrow: "Our answer",
    title: "A research tool you can carry to the shore",
    body: "Reef Monitoring ROV: live 1080p, depth and temperature logging, field-proven at Pulau Hantu and Pulau Tioman — max depth 11.04 m, over 10,000 logged samples.",
    visual: "solution" as const,
    image: "/images/rov/underwater-action.jpg",
  },
] as const;
