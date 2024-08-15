import express from 'express';
import fileDb from '../fileDb';
import {MessageWithoutId} from '../types';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const messages = await fileDb.getMessages();
  return res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
  if (!req.body.message) {
    return res.status(400).send({error: 'Message must be present in the request'});
  }

  const message: MessageWithoutId = {
    author: req.body.author ? req.body.author : null,
    message: req.body.message,
    image: req.body.image ? req.body.image : null,
  };

  const savedMessages = await fileDb.addMessage(message);
  return res.send(savedMessages);
});

export default messagesRouter;