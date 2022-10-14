import loadable from '@loadable/component';
// import { Login, ResetPassword, OrderManager, ItemManager, Report, Customers } from '../pages';
// import TestPage from '../pages/TestPage';

export const routes = [
  {
    id: 999,
    path: '/',
    element: () => loadable(() => import('pages/TestPage')),
  },
  {
    path: '/login',
    element: () => loadable(() => import('pages/Login')),
  },
];

// {
//   path: '/login',
//   element: () => loadable(() => Login),
// },
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
