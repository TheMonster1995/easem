import React from 'react';
import { Routes as BrowserRoutes, Route } from 'react-router-dom';
import { routes } from './routesList';
import Header from 'components/wrapper/Header';

const Routes: React.FC = () => {
  const renderRoutes = () =>
    routes.map((route) => {
      const Element = route.element();
      return (
        <Route
          path={route.path}
          element={<Element />}
          key={`route${route.id}`}
        />
      );
    });

  return (
    <>
      <Header />
      <BrowserRoutes>{renderRoutes()}</BrowserRoutes>
    </>
  );
};

export default Routes;
