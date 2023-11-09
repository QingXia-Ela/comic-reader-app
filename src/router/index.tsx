import { Text } from 'react-native';
import { createMemoryRouter } from 'react-router';

const router = createMemoryRouter([
  {
    path: '/',
    element: <Text>what</Text>,
  },
  {
    path: '/detail/:id',
    element: <Text>detail</Text>,
  },
  {
    path: '/read/:id',
    element: <Text>read</Text>,
  },
]);

export default router;
