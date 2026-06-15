import { FC } from 'react';
import { getUser } from '@selectors';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);

  return <AppHeaderUI userName={user?.name} />;
};
