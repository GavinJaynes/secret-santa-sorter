export interface Participant {
  id: string;
  name: string;
  email: string;
  giftValue: number;
  assignedTo?: Participant;
}
