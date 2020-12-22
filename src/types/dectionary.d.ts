export interface Dictionary {
  title: string;
  words: DictContents[];
  timeStamp: any; // 型はあとで考える
  documentId: any;
}

export interface DictContents {
  word: string;
  explanation: string;
}
