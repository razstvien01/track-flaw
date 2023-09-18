'use client'

import { useUserDataAtom } from '@/app/hooks/user_data_atom';
import React, { useEffect } from 'react'

const Dashboard = () => {
  
  
  const [userData, setUserData] = useUserDataAtom();
  
  return (
    <div>
      {userData.full_name}
    </div>
  // return (
  //   <div>Dashboard</div>
  )
}

export default Dashboard