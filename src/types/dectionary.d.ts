/** DBから取得する型 */
export interface Dictionary {
  title: string;
  words: DictContents[];
  timeStamp: string;
  documentId: string;
  uid: string;
}

export interface DictContents {
  word: string;
  explanation: string;
}