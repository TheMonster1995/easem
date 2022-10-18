import loadable from '@loadable/component';
// import { Login, ResetPassword, OrderManager, ItemManager, Report, Customers } from '../pages';
// import TestPage from '../pages/TestPage';

export const routes = [
  {
    id: '01',
    path: '/',
    element: () => loadable(() => import('pages/Dashboard/OrderManager')),
    loginRequired: true,
  },
  {
    id: '02',
    path: '/login',
    element: () => loadable(() => import('pages/Login')),
    loginRequired: false,
  },
];

//
// {
//   path: '/resetpassword/:token',
//   element: () => loadable(() => ResetPassword),
// },
// {
//   path: '/orders',
//   element: () => loadable(() => OrderManager),
// },
// {
//   path: '/easem',
//   element: () => loadable(() => ItemManager),
// },
// {
//   path: '/report',
//   element: () => loadable(() => Report),
// },
// {
//   path: '/customers',
//   element: () => loadable(() => Customers),
// },
