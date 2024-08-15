import {promises as fs} from 'fs';
import {IMessage, MessageWithoutId} from './types';
import {randomUUID} from 'node:crypto';

const fileName = './db.json';
let data: IMessage[] = [];

const fileDb = {
  async init () {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch(e) {
      data = [];
    }
  },
  async getMessages () {
    return data;
  },
  async addMessage (message: MessageWithoutId) {
    const newMessage: IMessage = {
      ...message,
      id: randomUUID(),
    };

    data.push(newMessage);
    await this.save();
    return newMessage;
  },
  async save () {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
  },
};

export default fileDb;