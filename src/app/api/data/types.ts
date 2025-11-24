export type StoryMedia = {
  src: string;
  alt: string;
};

export type StoryStop = {
  id: string;
  title: string;
  city: string;
  time?: string;
  description: string;
  tags?: string[];
  price?: string;
  media?: StoryMedia[];
  href?: string;
};

export type StoryDay = {
  id: string;
  label: string;
  summary: string;
  cities: string[];
  heroImage: string;
  heroVideo?: string;
  mood?: string;
  stops: StoryStop[];
};

export type StoryResponse = {
  tripTitle: string;
  tripSubtitle: string;
  days: StoryDay[];
  ctas: {
    label: string;
    href: string;
    type: "whatsapp" | "booking" | "info";
  }[];
};

export type BudgetLine = {
  label: string;
  amount: number;
  note: string;
  category: "vols" | "logement" | "activites" | "repas" | "transport" | "visa" | "divers";
};

export type BudgetResponse = {
  perPerson: BudgetLine[];
  totalPerPerson: number;
  totalGroup: number;
  groupSize: number;
  promo?: {
    label: string;
    amount: number;
  };
};

export type FeatureFlagsResponse = {
  animations: boolean;
  motionLevel: "full" | "reduced" | "off";
  contrast: "normal" | "high";
  density: "airy" | "compact";
};

export type SearchResult =
  | {
      kind: "day";
      id: string;
      title: string;
      subtitle: string;
      description?: string;
    }
  | {
      kind: "stop";
      id: string;
      title: string;
      subtitle: string;
      dayId?: string;
      href?: string;
      description?: string;
    }
  | {
      kind: "cta";
      id: string;
      title: string;
      subtitle: string;
      description?: string;
      href: string;
    };
