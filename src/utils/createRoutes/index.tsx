import { RouteObject, Navigate } from 'react-router-dom';
import { RouteConfig } from '../../config';

export const createRoutes = (routes: RouteConfig[]): RouteObject[] => {
  return [
    ...routes
      .filter(route => !route.isHidden)
      .map(route => ({
        path: route.path,
        element: <route.element path={route.path} name={route.name} isHidden={route.isHidden} />,
        children: route.children ? createRoutes(route.children) : undefined,
      })),
    {
      path: '*',
      element: <Navigate to="/" replace />
    }
  ];
};