import React, { useContext } from 'react';
import { Routes as BrowserRoutes, Route, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import { routes } from './routesList';
import Header from 'components/wrapper/Header';
import { AuthContext } from 'store/authContext';
import Wait from './Wait';

const Routes: React.FC = () => {
  const { isAuthorized } = useContext(AuthContext);

  const renderRoutes = () =>
    routes.map((route) => {
      let Element =
        isAuthorized === null
          ? () => <FontAwesomeIcon icon={faCoffee} />
          : route.element();
      if (route.loginRequired && isAuthorized === false) Element = null;
      if (!route.loginRequired && isAuthorized) Element = null;
      return (
        <Route
          path={route.path}
          element={
            Element ? (
              <Element />
            ) : (
              <Navigate replace to={isAuthorized ? '/' : '/login'} />
            )
          }
          key={`route${route.id}`}
        />
      );
    });

  return (
    <>
      <Header />
      {isAuthorized === null ? (
        <Wait display={true} />
      ) : (
        <BrowserRoutes>{renderRoutes()}</BrowserRoutes>
      )}
    </>
  );
};

export default Routes;
