export interface Lesson {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr?: string;
  content: string;
  contentAr?: string;
  example: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: number;
  question: string;
  questionAr?: string;
  hint: string;
  hintAr?: string;
  expectedQuery: string;
  checkFunction: (result: unknown[]) => boolean;
}

export interface QueryResult {
  columns: string[];
  values: any[][];
  error?: string;
}
