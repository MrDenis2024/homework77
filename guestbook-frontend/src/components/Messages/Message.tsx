import React from 'react';
import {IMessage} from '../../types';
import {API_URL} from '../../constants';

interface Props {
  message: IMessage,
}

const Message: React.FC<Props> = ({message}) => {
  return (
    <div className='d-flex gap-4 align-items-center border rounded-3 border-info-subtle mb-3 p-3'>
      {message.image && <div><img className='rounded-4' style={{width: '150px', maxHeight: '150px'}} src={`${API_URL}/${message.image}`} alt={message.author ? (message.author) : ('anonymous')}/></div>}
      <div>
        <span>Author:<strong> {message.author ? (message.author) : ('Anonymous')}</strong></span>
        <p className='mb-0 mt-2'>Message: <strong>{message.message}</strong></p>
      </div>
    </div>
  );
};

export default Message;