import BasicLayout from '../layouts/BasicLayout';
import { Text } from 'react-native';
import { createMemoryRouter } from 'react-router';

const router = createMemoryRouter([
  {
    path: '/',
    Component: BasicLayout,
    children: [
      {
        path: '/',
        element: <Text style={{ color: 'red' }}>what</Text>,
      },
      {
        path: '/search',
        element: <Text style={{ color: 'red' }}>search</Text>,
      },
      {
        path: '/settings',
        element: <Text style={{ color: 'red' }}>settings</Text>,
      },
    ],
  },
]);

export default router;
