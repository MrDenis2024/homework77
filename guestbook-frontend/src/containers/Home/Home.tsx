import {useEffect, useState} from 'react';
import Modal from '../../components/Modal/Modal';
import MessageForm from '../../components/MessageForm/MessageForm';
import {MessageMutation} from '../../types';
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {createMessage, fetchMessages} from '../../store/messagesThunks';
import {selectorCreateMessageLoading, selectorFetchLoading, selectorMessages} from '../../store/messagesSlice';
import Message from '../../components/Messages/Message';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectorCreateMessageLoading);
  const fetchLoading = useAppSelector(selectorFetchLoading);
  const messages = useAppSelector(selectorMessages);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const onFormSubmit = async (message: MessageMutation) => {
    try {
      await dispatch(createMessage(message)).unwrap();
      setShowModal(false);
      dispatch(fetchMessages());
      toast.success('Message successfully created!');
    } catch (e) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <>
      <div className='my-4'>
        <div className='d-flex justify-content-around mb-4'>
          <h2 className='col-10 text-center'>Reviews</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>New message</button>
        </div>
        <div>
          {messages.length > 0 ? (
            messages.map((message) => (
                <Message key={message.id} message={message} />
            ))
          ) : (
            <h3 className='text-center border rounded-3 border-info-subtle p-3'>No messages. Add a new message</h3>
          )}
          {fetchLoading && (<div className='text-center'><Spinner /></div>)}
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className='modal-body'>
          <MessageForm onSubmit={onFormSubmit} createLoading={createLoading} modal={showModal} onClose={() => setShowModal(false)} />
        </div>
      </Modal>
    </>
  );
};

export default Home;