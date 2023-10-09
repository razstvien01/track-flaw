"use client";

import { useCurrOrgDataAtom } from "@/hooks/curr_org_data_atom";
import { useUserDataAtom } from "@/hooks/user_data_atom";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import React, { useCallback, useEffect } from "react";
import { DataTable } from "../components/table/data_table";
import { columns } from "../components/table/columns";
import { getMembersInOrgs, getOrgDetails } from "@/services/org.service";
import { useCurrOrgMemberAtom } from "@/hooks/curr_org_members_atom";

const Organization = ({ params }: any) => {
  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom();
  const org_id = params.org_id;
  const [orgMembers, setOrgMembers] = useCurrOrgMemberAtom();
  
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
      }
    }
    
  }, [org_id, setCurrOrgData]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);
  
  useEffect(() => {
    fetchOrgDetails()
  }, [fetchOrgDetails])

  return (
    <div>
      <div>
        <PageHeader>
          <PageHeaderHeading>
            {currOrgData.org_id !== ""
              ? currOrgData.org_name
              : "Welcome to the Dashboard !!!"}
          </PageHeaderHeading>
          <PageHeaderDescription>
            {currOrgData.org_details !== ""
              ? currOrgData.org_details
              : "Please select an organization."}
          </PageHeaderDescription>
        </PageHeader>
      </div>
      <div className="m-10">
        {/* {currOrgData.org_id !== "" ? ( */}
        <DataTable data={orgMembers || []} columns={columns} />
        {/* ) : null} */}
      </div>
    </div>
  );
};

export default Organization;
