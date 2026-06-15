import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { getUserError } from '@selectors';
import { clearUserError, registerUser } from '@slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const errorText = useSelector(getUserError);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(
    () => () => {
      dispatch(clearUserError());
    },
    [dispatch]
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name: userName, email, password }));
  };

  return (
    <RegisterUI
      errorText={errorText || undefined}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
