"use client";

import { useUserDataAtom } from "@/app/hooks/user_data_atom";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import React, { useEffect } from "react";

const Dashboard = () => {
  const [userData, setUserData] = useUserDataAtom();
  const { org_refs = []} = userData || {}
  // TODO make a selected Organization hook atom
  console.log(userData);
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Welcome !!!</PageHeaderHeading>
      </PageHeader>
    </div>
    // return (
    //   <div>Dashboard</div>
  );
};

export default Dashboard;
