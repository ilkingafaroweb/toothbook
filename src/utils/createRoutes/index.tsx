import { RouteObject, Navigate } from 'react-router-dom';
import { RouteConfig } from '../../config';

export const createRoutes = (routes: RouteConfig[]): RouteObject[] => {
  const offer = sessionStorage.getItem('offer');
  return [
    ...routes
      .filter(route => !route.isHidden)
      .map(route => ({
        path: route.path,
        element: <route.element {...route} />,
        children: route.children ? createRoutes(route.children) : [],
      })),
    {
      path: '*',
      element: <Navigate to={offer ? "/findyourdentist" : "/"} replace />
    }
  ];
};
