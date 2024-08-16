import React, {MouseEventHandler, useEffect, useState} from 'react';
import {MessageMutation} from '../../types';
import FileInput from '../FileInput/FileInput';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (message: MessageMutation) => void;
  modal: boolean;
  createLoading: boolean;
  onClose: MouseEventHandler;
}

const emptyState: MessageMutation = {
  author: '',
  message: '',
  image: null,
};

const MessageForm: React.FC<Props> = ({onSubmit, modal, createLoading, onClose}) => {
  const [message, setMessage] = useState<MessageMutation>(emptyState);

  useEffect(() => {
    if (!modal) {
      setMessage(emptyState);
    }
  }, [modal]);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...message});
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setMessage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setMessage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className='p-3' onSubmit={submitFormHandler}>
      <h4>New message</h4>
      <div className='form-group mb-3'>
        <label htmlFor='author'>Author</label>
        <input type="text" name="author" id="author" className='form-control' onChange={inputChangeHandler}
               value={message.author}/>
      </div>
      <div className="form-group mb-3">
        <textarea id="message" name='message' cols={41} rows={3} className="border border-primary-subtle" required
                  placeholder="Enter your message" value={message.message} onChange={inputChangeHandler}></textarea>
      </div>
      <div className="form-group mb-4">
        <FileInput onChange={fileInputChangeHandler} modal={modal}/>
      </div>
      <div className='d-flex justify-content-around col-7 ms-auto'>
        <button type='submit' className='btn btn-success' disabled={createLoading}>{createLoading &&
          <ButtonSpinner/>}Save message
        </button>
        <button type='button' className='btn btn-danger' onClick={onClose} disabled={createLoading}>{createLoading &&
          <ButtonSpinner/>} Close
        </button>
      </div>
    </form>
  );
};

export default MessageForm;