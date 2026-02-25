export interface Todo {
  id: number;
  title: string;
  description: string | null;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
