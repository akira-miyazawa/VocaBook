export interface Dictionary {
  title: string;
  words: DictContents[];
}

export interface DictContents {
  word: string;
  explanation: string;
}
