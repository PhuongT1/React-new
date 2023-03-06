import NftManage from 'pages/nft-manage';
import React from 'react';

// Lazy loading component
const MemberManage = React.lazy(() => import('../pages/member-manage'));

const routestesting = [
  {
    path: 'member-manage',
    element: <MemberManage />,
  },
  {
    path: 'nft-manage',
    element: <NftManage />,
  },
  {
    path: 'member-manage/view-detail/id/:id',
    element: <><p>phuong tran</p></>,
  }  
]
export default routestesting