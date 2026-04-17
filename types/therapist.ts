export type Therapist = {
  id: string;
  name: string;
  location: string;
  type: "online" | "offline";
  contact: string;
  price_range?: string;
};
