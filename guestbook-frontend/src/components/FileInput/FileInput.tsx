import React, {useEffect, useRef, useState} from 'react';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  modal: boolean;
}

const FileInput: React.FC<Props> = ({onChange, modal}) => {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!modal && inputRef.current) {
      inputRef.current.value = '';
      setFilename('');
    }
  }, [modal]);

  const activateInput = () => {
    if(inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }
    onChange(e);
  };

  return (
    <>
      <input type='file' style={{display: 'none'}} ref={inputRef} name='image' onChange={onFileChange}/>
      <label htmlFor='image'>Image</label>
      <div className='d-flex'>
        <input type="text" id="image" className='form-control' value={filename} onClick={activateInput} readOnly/>
        <button type='button' className='btn btn-primary ms-5' onClick={activateInput}>Browse</button>
      </div>
    </>
  );
};

export default FileInput;