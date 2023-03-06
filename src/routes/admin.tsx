import NftManage from 'pages/nft-manage';
import React from 'react';
import { Outlet } from 'react-router-dom';
import routeMember from './member-manage';
import routeNftManage from './nft-manage';

const routeAdmin = [
  {
    path: 'member-manage',
    element: <Outlet />,
    children: routeMember
  },
  {
    path: 'nft-manage',
    element: <Outlet />,
    children: routeNftManage
  }  
]
export default routeAdmin