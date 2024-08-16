import {useState} from 'react';
import Modal from '../../components/Modal/Modal';
import MessageForm from '../../components/MessageForm/MessageForm';
import {MessageMutation} from '../../types';
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {createMessage} from '../../store/messagesThunks';
import {selectorCreateMessageLoading} from '../../store/messagesSlice';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectorCreateMessageLoading);


  const onFormSubmit = async (message: MessageMutation) => {
    try {
      await dispatch(createMessage(message)).unwrap();
      setShowModal(false);
      toast.success('Message successfully created!');
    } catch (e) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <>
      <div className='my-4'>
        <div className='d-flex justify-content-around'>
          <h2 className='col-10 text-center'>Reviews</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>New message</button>
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