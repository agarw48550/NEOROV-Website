export const reefStoryBeats = [
  {
    id: "crisis",
    eyebrow: "The problem",
    title: "You can’t protect what you can’t see",
    body: "Singapore’s waters hold roughly 255 species of hard coral — nearly a third of the world’s total — packed into a tiny area. Since 1953, more than 60% of that cover has been lost. Decades of reclamation have disrupted growth and cut visibility to less than an arm’s length.",
    visual: "crisis" as const,
    image: "/images/rov/underwater-action.jpg",
  },
  {
    id: "bleaching",
    eyebrow: "Heat stress",
    title: "Reefs are living cities under pressure",
    body: "Coral is a calcium skeleton with polyps and symbiotic algae that feed and colour the colony. Warm the sea by 1.5–2 °C and the polyps expel the algae — bleaching. Without algae, coral starves. Over 84% of the world’s reefs face heat stress; reefs cover under 1% of the ocean floor yet support about 1 in 4 marine species.",
    visual: "bleaching" as const,
    image: "/images/rov/team-field.jpg",
  },
  {
    id: "gap",
    eyebrow: "The survey gap",
    title: "Divers alone can’t keep pace",
    body: "Traditional surveys send trained divers along fixed routes with tape and slate. They’re accurate — and limited by air, depth, decompression, currents, and personal risk. Their presence also disturbs the fauna being studied. Commercial research ROVs cost tens of thousands and need support vessels; consumer drones can’t carry science instruments.",
    visual: "gap" as const,
    image: "/images/rov/poolside-rov-web.jpg",
  },
  {
    id: "solution",
    eyebrow: "Our answer",
    title: "A research tool you can carry to the shore",
    body: "Reef Monitoring ROV is a low-cost, open-architecture vehicle: live 1080p video, depth, temperature and pH logging, ~5.9 kg, about $1,500, deployable from shore or a small boat. Field-proven at Pulau Hantu and Pulau Tioman — max depth 11.04 m, over 10,000 logged samples — built to help map and monitor reefs that are hard to see any other way.",
    visual: "solution" as const,
    image: "/images/rov/underwater-action.jpg",
  },
] as const;
