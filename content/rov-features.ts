export type RovFeature = {
  id: string;
  title: string;
  body: string;
  /** Camera look-at in model space (origin = vehicle center, upright). */
  lookAt: [number, number, number];
  /** Camera position for this feature */
  camera: [number, number, number];
  /** Supporting photo of this subsystem */
  image?: string;
};

/**
 * Focuses after upright correction (acrylic along Z; aft ≈ −Z; thrusters ±X).
 * Cameras stay outside thruster envelopes (~|x| > 1.0) so chapters don’t clip.
 */
export const rovFeatures: RovFeature[] = [
  {
    id: "frame",
    title: "Open PVC frame",
    body: "An open-frame cage of ~35 × 30 × 25 cm at ~5.9 kg in air. Water flows through the skeleton to cut drag, components stay accessible, and the structure shields the acrylic capsule from reef impacts.",
    lookAt: [0, 0, 0],
    camera: [1.75, 0.9, 2.0],
    image: "/images/rov/frame-cad.png",
  },
  {
    id: "capsule",
    title: "Acrylic dry capsule",
    body: "Flight computer, companion computer, and the 4S LiPo live inside a transparent acrylic cylinder closed by machined aluminium end caps with dual O-ring grooves — redundant seals rated toward a 30 m design target.",
    // Elevated side view of the tube — above thruster height
    lookAt: [0.0, -0.04, 0.05],
    camera: [1.05, 0.55, 0.35],
    image: "/images/rov/onboard-electronics.jpg",
  },
  {
    id: "thrusters",
    title: "Four T200 thrusters",
    body: "Blue Robotics T200 BLDC thrusters in Simple ROV 4 geometry: two horizontal for forward thrust and yaw, two vertical for heave and roll correction — flooded-motor design for power density underwater.",
    lookAt: [0.7, 0.2, -0.15],
    camera: [1.55, 0.4, 0.55],
    image: "/images/rov/underwater-action.jpg",
  },
  {
    id: "stack",
    title: "Flight & companion stack",
    body: "Pixhawk 2.4.8 running ArduSub, a Raspberry Pi on BlueOS, and topside QGroundControl over the tether — the pilot link that turns shore-side inputs into reef-scale video and telemetry.",
    // Peek into the tube from slightly forward / above
    lookAt: [0.0, 0.0, 0.1],
    camera: [0.35, 0.55, 0.85],
    image: "/images/rov/onboard-view.jpg",
  },
  {
    id: "sensors",
    title: "Depth, temperature & pH",
    body: "A Blue Robotics Bar30 logs depth, pressure, and water temperature over I²C so abiotic conditions travel with every video transect.",
    // Lower green / FR4 mount region
    lookAt: [0.0, -0.25, 0.05],
    camera: [1.1, -0.35, 0.85],
    image: "/images/rov/poolside-rov-web.jpg",
  },
  {
    id: "tether",
    title: "30 m Cat6 tether",
    body: "A shielded Ethernet tether carries pilot commands down and telemetry plus 1080p video up to a laptop on the surface — low latency, shore- or boat-deployable, no radio through seawater.",
    // Aft view of rear plate / wire exit
    lookAt: [0.0, 0.05, -0.45],
    camera: [0.35, 0.4, -1.35],
    image: "/images/rov/gopro-poolside.jpg",
  },
];

export const fieldRecord = [
  { label: "Max depth", value: "11.04 m" },
  { label: "Samples logged", value: "10,000+" },
  { label: "Build cost", value: "~$1,500" },
  { label: "Mass in air", value: "~5.9 kg" },
  { label: "Sites", value: "Hantu · Tioman" },
  { label: "Permit", value: "NP/RP 25-078" },
];

export const rovGallery = [
  "/images/rov/underwater-action.jpg",
  "/images/rov/underwater-rov.jpg",
  "/images/rov/poolside-rov-web.jpg",
  "/images/rov/gopro-poolside.jpg",
  "/images/rov/gopro-surface.jpg",
  "/images/rov/gopro-deploy.jpg",
  "/images/rov/onboard-view.jpg",
  "/images/rov/onboard-electronics.jpg",
  "/images/rov/onboard-wiring.jpg",
  "/images/rov/team-field.jpg",
  "/images/rov/tioman-reef.jpg",
  "/images/rov/hantu-reef.jpg",
  "/images/rov/gopro-hull.jpg",
  "/images/rov/gopro-waterline.jpg",
  "/images/rov/onboard-capsule.jpg",
];
