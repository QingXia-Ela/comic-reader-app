import InnerRouter from '..';
import { Routes, Route } from 'react-router-native';

interface RouterProviderProps {
  router: typeof InnerRouter;
}

export default function RouterProvider({ router }: RouterProviderProps) {
  return (
    <Routes>
      {router.map((route, index) => {
        return <Route key={index} path={route.path} element={route.element} />;
      })}
    </Routes>
  );
}
