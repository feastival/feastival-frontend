export interface Event {
  id: string;
  name: string;
  imageUrl?: string;
  description: string;
  location: string;
  venue: string;
  organizer?: string;
  startedAt: Date;
  finishedAt: Date;
  statusId?: string;
  categoryId?: string;
}
