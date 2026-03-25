export interface Lesson {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  content: string;
  example: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: number;
  question: string;
  hint: string;
  expectedQuery: string;
  checkFunction: (result: unknown[]) => boolean;
}

export interface QueryResult {
  columns: string[];
  values: any[][];
  error?: string;
}
