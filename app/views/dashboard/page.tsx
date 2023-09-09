import React from 'react'

const Dashboard = () => {
  const superAdminRoleKey = process.env.SUPER_ADMIN_ROLE_KEY;
  const adminRoleKey = process.env.ADMIN_ROLE_KEY;
  const testerRoleKey = process.env.TESTER_ROLE_KEY;
  const developerRoleKey = process.env.DEVELOPER_ROLE_KEY;

  return (
    <div>
      <h1>Environment Variables</h1>
      <ul>
        <li>SUPER_ADMIN_ROLE_KEY: {superAdminRoleKey}</li>
        <li>ADMIN_ROLE_KEY: {adminRoleKey}</li>
        <li>TESTER_ROLE_KEY: {testerRoleKey}</li>
        <li>DEVELOPER_ROLE_KEY: {developerRoleKey}</li>
      </ul>
    </div>
  // return (
  //   <div>Dashboard</div>
  )
}

export default Dashboard