export interface TimeSlot {
  time: string;
  available: boolean;
  booked?: boolean;
}

export interface Appointment {
  id: string;
  date: Date;
  time: string;
  clientName?: string;
}
