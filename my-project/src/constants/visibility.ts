import { Globe, Lock } from "lucide-react";

export const visibilityTypes = [
  {
    value: "public",
    label: "Public",
    icon: Globe,
  },
  {
    value: "private",
    label: "Private",
    icon: Lock,
  },
  {
    value: "only me",
    label: "Only Me",
    icon: Lock,
  },
];
