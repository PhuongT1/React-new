import React from 'react';

// Lazy loading component
const NftManage = React.lazy(() => import('pages/nft-manage'));

const routeNftManage = [
  {
    path: '',
    element: <NftManage />,
  },
  {
    path: 'view-detail/id/:id',
    element: <><p>NftManage detail</p></>,
  } 
]
export default routeNftManage