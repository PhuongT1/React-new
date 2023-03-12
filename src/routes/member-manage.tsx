import React from 'react';
import DetailMember from 'pages/member-manage/detail'
// Lazy loading component
const MemberManage = React.lazy(() => import('pages/member-manage'));

const routeMember = [
  {
    path: '',
    element: <MemberManage />,
  },
  {
    path: 'view-detail/id/:id',
    element: <DetailMember />,
  } 
]
export default routeMember