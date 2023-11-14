"use client";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrOrgDataAtom } from "@/hooks/curr_org_data_atom";
import { useLoadingAtom } from "@/hooks/loading.atom";

const Dashboard = () => {
  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom();
  const router = useRouter();
  const { org_id = "" } = currOrgData;
  const [isLoading, setIsLoading] = useLoadingAtom();

  useEffect(() => {
    
    const loadingTimeout = setTimeout(() => {
      
      router.push(`/dashboard/${org_id}`);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, [isLoading, setIsLoading, org_id, router]);
  
  return (
    <div>
      <div>
        <PageHeader>
          <PageHeaderHeading>Welcome to the Dashboard !!!</PageHeaderHeading>
          <PageHeaderDescription>
            Please select an organization.
          </PageHeaderDescription>
        </PageHeader>
      </div>
    </div>
  );
};

export default Dashboard;
