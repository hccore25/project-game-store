import type { IconName } from "./icons";

export interface Genre {
  slug: string;
  name: string;
  icon: IconName;
}

export const genres: Genre[] = [
  { slug: "rpg", name: "RPG", icon: "shield" },
  { slug: "action-adv", name: "ACTION-ADV", icon: "swords" },
  { slug: "strategy", name: "STRATEGY", icon: "users" },
  { slug: "indie", name: "INDIE", icon: "gamepad" },
];
