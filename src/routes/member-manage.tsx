import React from 'react';

// Lazy loading component
const MemberManage = React.lazy(() => import('pages/member-manage'));

const routeMember =  [
  {
    path: '',
    element: <MemberManage />,
  },
  {
    path: 'view-detail/id/:id',
    element: <><p>MemberManage detail</p></>,
  } 
]
export default routeMember