export interface Client {
  id: string;
  name: string;
  email: string;
  image: string;
  highlights: ClientHighlights;
  details: ClientDetails;
}

export interface ClientHighlights {
  timesAttended: number;
  totalSpent: number;
  additionalHighlights?: ClientHighlight[];
}

export interface ClientHighlight {
  name: string;
  value: string;
}

export interface ClientDetails {
  email: string;
  phone: string;
  birthDate: string;
  age: number;
}
