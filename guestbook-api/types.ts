export interface IMessage {
  id: string;
  author: string | null;
  message: string;
  image: string | null;
}

export type MessageWithoutId = Omit<IMessage, "id">;