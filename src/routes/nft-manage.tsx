import DetailNft from 'pages/nft-manage/detail';
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
    element: <DetailNft />,
  } 
]
export default routeNftManage