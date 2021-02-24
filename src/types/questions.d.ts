import { DictContents } from "@/types/dectionary";

export interface Questions {
  questions: Question[]
}

interface Question {
  question: string,
  selections: DictContents[],
}
