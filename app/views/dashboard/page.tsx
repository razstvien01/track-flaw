"use client";

import { useUserDataAtom } from "@/app/hooks/user_data_atom";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import React, { useEffect } from "react";

const Dashboard = () => {
  const [userData, setUserData] = useUserDataAtom();
  const { org_refs = []} = userData || {}
  // TODO make a selected Organization hook atom, make an additional attribute for the organization which is the details
  console.log(userData);
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Welcome to the Dashboard !!!</PageHeaderHeading>
        <PageHeaderDescription>Please select an organization.</PageHeaderDescription>
      </PageHeader>
    </div>
    // return (
    //   <div>Dashboard</div>
  );
};

export default Dashboard;
