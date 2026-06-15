import { ProfileUI } from '@ui-pages';
import { getUpdateUserError, getUser } from '@selectors';
import { updateUser } from '@slices/userSlice';
import { Preloader } from '@ui';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const updateUserError = useSelector(getUpdateUserError);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    }));
  }, [user]);

  if (!user) {
    return <Preloader />;
  }

  const isFormChanged =
    formValue.name !== user.name ||
    formValue.email !== user.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const changedUserData = {
      ...(formValue.name !== user.name ? { name: formValue.name } : {}),
      ...(formValue.email !== user.email ? { email: formValue.email } : {}),
      ...(formValue.password ? { password: formValue.password } : {})
    };

    dispatch(updateUser(changedUserData));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateUserError || undefined}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
