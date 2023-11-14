"use client";

import { useCurrOrgDataAtom } from "@/hooks/curr_org_data_atom";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "../components/table/data_table";
import { columns } from "../components/table/columns";
import { getMembersInOrgs, getOrgDetails } from "@/services/org.service";
import { useCurrOrgMemberAtom } from "@/hooks/curr_org_members_atom";
import NotFound from "./not-found";

const Organization = ({ params }: any) => {
  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom();
  const org_id = params.org_id;
  const [orgMembers, setOrgMembers] = useCurrOrgMemberAtom();
  const [error, setError] = useState<any>(null);

  const fetchMembers = useCallback(async () => {
    if (org_id !== "") {
      const result = await getMembersInOrgs(org_id);
      if (result.success) {
        setOrgMembers(result.data);
      }
    }
  }, [org_id, setOrgMembers]);

  const fetchOrgDetails = useCallback(async () => {
    if (org_id !== "") {
      const result = await getOrgDetails(org_id);
      if (result.success) {
        setCurrOrgData(result.data);
      } else {
        setError('Organization not found');
      }
    }
  }, [org_id, setCurrOrgData]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  useEffect(() => {
    fetchOrgDetails();
  }, [fetchOrgDetails]);
  
  if (error) {
    return (<NotFound/>);
  }

  return (
    <div>
      <div>
        <PageHeader>
          <PageHeaderHeading>{currOrgData?.org_name}</PageHeaderHeading>
          <PageHeaderDescription>
            {currOrgData?.org_details}
          </PageHeaderDescription>
        </PageHeader>
      </div>
      <div className="m-10">
        <DataTable data={orgMembers || []} columns={columns} />
      </div>
    </div>
  );
};

export default Organization;