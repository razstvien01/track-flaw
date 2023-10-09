import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import React from "react";
import { DataTable } from "./components/table/data_table";
import { columns } from "./components/table/columns";

const Dashboard = () => {
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
