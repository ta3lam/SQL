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
  checkFunction: (result: unknown[], query?: string) => boolean;
}

// BUG 7: typed SQL cell values — no more any[][]
export type SqlValue = string | number | null | Uint8Array;

export interface QueryResult {
  columns: string[];
  values: SqlValue[][];
  error?: string;
  allResults?: { columns: string[]; values: SqlValue[][] }[];
}
