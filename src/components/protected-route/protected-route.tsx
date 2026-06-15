import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { getIsAuthChecked, getUser } from '@selectors';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnauth?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnauth = false,
  component
}: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnauth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} />;
  }

  if (!onlyUnauth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
};
