"use client";

import { useCurrOrgDataAtom } from "@/app/hooks/curr_org_data_atom";
import { useUserDataAtom } from "@/app/hooks/user_data_atom";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import React, { useEffect } from "react";

const Dashboard = () => {
  const [userData, setUserData] = useUserDataAtom();
  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom()
  // const { org_refs = []} = userData || {}
  // TODO make a selected Organization hook atom, make an additional attribute for the organization which is the details
  console.log(currOrgData);
  
  
  return (
    <div>
      <PageHeader>
        
        <PageHeaderHeading>{currOrgData.org_id !== '' ? currOrgData.org_name : 'Welcome to the Dashboard !!!'}</PageHeaderHeading>
        <PageHeaderDescription>{currOrgData.org_details !== '' ? currOrgData.org_details : 'Please select an organization.'}</PageHeaderDescription>
      </PageHeader>
    </div>
    // return (
    //   <div>Dashboard</div>
  );
};

export default Dashboard;
