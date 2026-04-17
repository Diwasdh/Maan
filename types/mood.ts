export type Mood = {
  id: string;
  user_id: string;
  mood_score: number;
  tags: string[];
  note?: string;
  created_at: string;
};
