import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from '../account/auth/login'
import MemberManage from '../pages/member-manage'
const routestesting = [
  {
    path: 'member-manage',
    element: <MemberManage />,
  },
  {
    path: 'member-manage/view-detail/id/:id',
    element: <><p>phuong tran</p></>,
  }  
]
export default routestesting