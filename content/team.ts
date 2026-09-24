export type TeamMember = {
  id: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
  image: string;
};

export const coreTeam: TeamMember[] = [
  {
    id: "shaurya",
    name: "Shaurya Ambedkar",
    role: "Project Lead",
    focus: "Dive operations · Science liaison",
    bio: "Fascinated by marine life since childhood, Shaurya leads the mission on the water — diving alongside the ROV, logging what the team sees, and connecting the build to researchers at NUS. He reconnected with Prof. Leo Tan at NParks Ubin Day, opening the path that gave the project its purpose.",
    image: "/images/team/shaurya-ambedkar.svg",
  },
  {
    id: "ayaan",
    name: "Ayaan Agarwal",
    role: "Main Team",
    focus: "Systems · Site · Engineering",
    bio: "Ayaan works across the engineering stack and the public face of the project — helping turn a competition build into a field research tool and shaping how the work is shared beyond the lab.",
    image: "/images/team/ayaan-agarwal.svg",
  },
  {
    id: "sanat",
    name: "Sanat Ramanathan",
    role: "Main Team",
    focus: "Pilot · Vehicle control",
    bio: "Sanat pilots the vehicle from topside, translating reef conditions into precise thruster inputs over the tether. He co-founded the project with Shaurya after MATE ROV 2024 and has stayed through every pool failure and open-water deployment.",
    image: "/images/team/sanat-ramanathan.svg",
  },
  {
    id: "sidhant",
    name: "Sidhant Jain",
    role: "Main Team",
    focus: "CAD · Fabrication · 3D printing",
    bio: "Sid joined late in Grade 9 with 3D printing and computer design skills that unlocked mounts, trays, and structural detail the earlier build lacked. He manages tether and systems topside when the vehicle is in the water.",
    image: "/images/team/sidhant-jain.svg",
  },
];

export type Collaborator = {
  name: string;
  role: string;
};

export const supervisors: Collaborator[] = [
  { name: "Prof. Huang Danwei", role: "National University of Singapore" },
  { name: "Prof. Leo Tan", role: "National University of Singapore" },
  { name: "Matthew Weaver", role: "UWCSEA East Innovation Lab" },
];

export const mediaTeam: Collaborator[] = [
  { name: "Bhavya Satia", role: "Media Team" },
];

export const acknowledgements: Collaborator[] = [
  { name: "Shantanu Ambedkar", role: "Logistics · Chaperone · Procurement" },
  { name: "Priyadarshini Kini", role: "Finance" },
  { name: "Sarika Ramanathan", role: "Logistics" },
  { name: "Ramanathan Sivabalan", role: "Procurement" },
  { name: "Saachi Ramanathan", role: "On-site cable operator · Transport" },
  { name: "Sumit Jain", role: "Chaperone" },
  { name: "Sujata Jain", role: "Art rendition" },
  { name: "Jackson Sullivan", role: "Contracted operations assistant" },
  { name: "Lester Kwok", role: "Orpheus Dive — Diving advisor" },
  { name: "Coral Chua", role: "Orpheus Dive — Diving advisor" },
  { name: "Jim Li", role: "Orpheus Dive — Pulau Hantu guide" },
  { name: "Joseph Kuah", role: "Berjaya Dive Centre — Pulau Tioman" },
  { name: "Nichole", role: "Dolphin Explorer — Pulau Hantu" },
  { name: "Josh Chomiak", role: "UBC / UWCSEA Alumni — Procurement advisor" },
];
