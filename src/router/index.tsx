import { Text } from 'react-native';
import { createMemoryRouter } from 'react-router';

const router = [
  {
    path: '/',
    element: <Text>what</Text>,
  },
  {
    path: '/search/:id',
    element: <Text>detail</Text>,
  },
  {
    path: '/settings',
    element: <Text>settings</Text>,
  },
];

export default router;
