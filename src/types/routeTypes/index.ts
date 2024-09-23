import React from 'react';

export interface RouteProps {
  path: string;
  name: string;
  isHidden: boolean;
}

export interface RouteConfig {
  path: string;
  name: string;
  isExact: boolean;
  isHidden: boolean;
  element: React.FC<RouteProps>; 
  children?: RouteConfig[];
}
