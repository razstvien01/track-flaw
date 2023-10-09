"use client";

import { useCurrOrgDataAtom } from "@/app/hooks/curr_org_data_atom";
import { useUserDataAtom } from "@/app/hooks/user_data_atom";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import React, { useEffect, useState } from "react";
import { DataTable } from "../components/table/data_table";
import { columns } from "../components/table/columns";
import { getMembersInOrgs } from "@/app/services/org.service";
import { OrgMembersType } from "@/app/types/types";
import { useCurrOrgMemberAtom } from "@/app/hooks/curr_org_members_atom";

const Dashboard = () => {
  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom();
  const { org_id = "" } = currOrgData || {};
  const [orgMembers, setOrgMembers] = useCurrOrgMemberAtom();

  useEffect(() => {
    const fetchMembers = async () => {
      if (org_id !== "") {
        const result = await getMembersInOrgs(org_id);

        if (result.success) {
          setOrgMembers(result.data);
        } else {
        }
      }
    };

    fetchMembers();
    return () => {};
  }, [currOrgData, org_id, setOrgMembers]);

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

export default Dashboard;

let sampleUsers = [
  {
    id: "1L89Gv7CMJeeThuJa9zh8x0rCSx2",
    name: "Nicolen Evanz Aricayos",
    photo_url:
      "https://lh3.googleusercontent.com/a/ACg8ocLuvtSTZeqwiV8dguCuHuB-JTFhLKNFnPjlgH2j9_MpNw=s96-c",
    phone_number: "09953988031",
    role: "ADMIN",
  },
  {
    id: "1Kym6IW5EBOtz4xITTQMRMw1u683",
    name: "James Francis Paraon",
    photo_url:
      "https://lh3.googleusercontent.com/a/ACg8ocI3N7QtyT20mrm22Q_Ru25GOeE-HL7r-lWiEVWniIR-Wg=s96-c",
    phone_number: "fdufd8883939",
    role: "MANAGER",
  },
  {
    id: "JFWzM0gghbNPrYehAkOnI6ilDms2",
    name: "Giou Keannu",
    photo_url:
      "https://lh3.googleusercontent.com/a/ACg8ocJPgEpKT0U-DrY-KYzAFFN_5IHy1mF3OTbvpezavzz4=s96-c",
    phone_number: "fdufd8883939",
    role: "DEVELOPER",
  },
];
