import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ComposeMailForm from '../components/ComposeMailForm';
import { sendMail, reset } from '../mailSlice';

const ComposeMailPage = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.mail);

  const handleSubmit = (formData) => {
    try{
      dispatch(sendMail(formData)).unwrap();
      return true;

    }catch(err){
      if(err){
        return false
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert('Mail sent successfully!');
      dispatch(reset());
    }
    if (isError) {
      alert(message);
      dispatch(reset());
    }
  }, [isSuccess, isError, message, dispatch]);

  return (
    <div className="max-w-3xl  p-4">
      <ComposeMailForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default ComposeMailPage;
