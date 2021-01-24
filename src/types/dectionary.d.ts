/** DBから取得する型 */
export interface Dictionary {
  title: string;
  words: DictContents[];
  timeStamp: string;
  documentId: string;
  uid: string;
}

/** 表示用の型 */
export interface DisplayDictContents {
  title: string;
  words: DictContents[];
}

export interface DictContents {
  word: string;
  explanation: string;
}