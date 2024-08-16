export interface IMessage {
  id: string;
  message: string;
  author: string | null;
  image: string | null;
}

export interface MessageMutation {
  message: string;
  author: string;
  image: File | null;
}