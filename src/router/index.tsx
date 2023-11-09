import { Text } from 'react-native';
import { createMemoryRouter } from 'react-router';

const router = createMemoryRouter([
  {
    path: '/',
    element: <Text>what</Text>,
  },
]);

export default router;
