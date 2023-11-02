"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AlertSuccess from "@/components/success_alert";
import AlertDestructive from "@/components/alert_destructive";
import { UserAuth } from "@/context/auth_context";
// import { OrgDataProps } from "../types/types";
// import { OrgDataInit } from "../types/init";
// import { ROLES } from "../types/constants";
import { Textarea } from "@/components/ui/textarea";
// import { createOrganization } from "../services/org.service";
import { ShowToast } from "@/components/show-toast";
import { useUserDataAtom } from "@/hooks/user_data_atom";
import { createNotif } from "@/services/notifications.service";
import { Dialog } from "@radix-ui/react-dialog";
import { CalendarForm } from "./calendar_form";

interface AddProjectDialogProps {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const AddProjectDialog = ({
  showDialog,
  setShowDialog,
}: AddProjectDialogProps) => {
  const { user } = UserAuth();
  const { uid } = user;
  // const [orgData, setOrgData] = useState<OrgDataProps>(OrgDataInit);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState({
    success: false,
    error: false,
  });

  const [message, setMessage] = useState("");
  const [toastParams, setToastParams] = useState<any>();
  const [showToast, setShowToast] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userData, setUserData] = useUserDataAtom();

  // useEffect(() => {
  //   if (hasSubmitted) {
  //     const timer = setTimeout(() => {
  //       setIsVisible({
  //         error: false,
  //         success: false,
  //       });
  //       setShowNewOrgDialog(false);
  //       setShowToast(true);
  //       setIsSave(false)
  //     }, 2000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [isVisible.success, toastParams, hasSubmitted, setShowNewOrgDialog]);

  // useEffect(() => {
  //   if (showToast) {
  //     ShowToast(toastParams);
  //     setShowToast(false);
  //     setHasSubmitted(false);
  //   }
  // }, [showToast, toastParams]);

  //* Function to handle form submission
  const handleSubmit = async () => {
    setIsSave(true);

    // const result = await createOrganization(orgData, uid);

    // if (result.success) {
    //   const { full_name, user_id, photo_url } = userData
    //   const { org_id = "", org_name = "" } = result.data

    //   const params = {
    //     user_id,
    //     org_id,
    //     photo_url,
    //     title: "Organization Created",
    //     description: `${full_name} created ${org_name} organization`,
    //     type: "organization",
    //   };

    //   await createNotif(params)

    //   setHasSubmitted(true);
    //   setToastParams({
    //     title: "Creating Organization",
    //     description: "You have successfully created an organization.",
    //     variant: "default",
    //   });
    //   setMessage(result.data.message);
    //   setIsVisible({
    //     error: false,
    //     success: true,
    //   });
    // } else {
    //   setMessage(result.error.message);
    //   setIsVisible((prev) => ({
    //     ...prev,
    //     error: true,
    //   }));
    // }

    setIsSave(false);
  };

  const handleOnchangeData = (e: any) => {
    const { id, value } = e.target;
    // setOrgData((prev: OrgDataProps) => ({ ...prev, [id]: value }));
  };

  const handleSelectOnchangeData = (value: string) => {
    // setOrgData((prev: OrgDataProps) => ({
    //   ...prev,
    //   role: value,
    // }));
  };

  const handleCalendarData = (date?: Date, field?: any) => {
    // field.onChange(date);
    if (!date) return; // Exit early if date is undefined
    if (!field) return;
    
    field.onChange(date);
    console.log("Selected Date:", date);
    // toast({
    //   title: "You selected the date:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(date, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            {
              "Add a new project to track bugs and issues for your organization's ongoing initiatives."
            }
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label>Project name</Label>
              <Input
                id="project_name"
                placeholder="Enter project name"
                onChange={(e) => handleOnchangeData(e)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Select Team</Label>
              <Select
                onValueChange={(e) => handleSelectOnchangeData(e)}
                // value={`${orgData.role}`}
                // defaultValue=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a team to handle this project" />
                </SelectTrigger>
                <SelectContent>
                  {/* {[ROLES.ADMIN, ROLES.MANAGER].map((role) => (
                  <SelectItem key={role} value={role}>
                    <span className="font-medium">{role}</span> -{" "}
                    <span className="text-muted-foreground">
                      {role === ROLES.ADMIN
                        ? "Managing projects and users"
                        : role === ROLES.MANAGER
                        ? "Oversee specific projects"
                        : null}
                    </span>
                  </SelectItem>
                ))} */}
                </SelectContent>
              </Select>
            </div>
            <CalendarForm
              label="Starting Date"
              handleCalendarData={handleCalendarData}
            />
            <CalendarForm
              label="End Date"
              handleCalendarData={handleCalendarData}
            />
            <div className="space-y-2">
              <Label>Project details</Label>
              <Textarea
                id="project_details"
                onChange={(e) => handleOnchangeData(e)}
                placeholder="Type your project details here."
              />
            </div>
          </div>
        </div>
        {isVisible.success ? <AlertSuccess description={message} /> : null}
        {isVisible.error ? <AlertDestructive description={message} /> : null}
        <DialogFooter>
          <Button
            variant="outline"
            // onClick={() => setShowNewOrgDialog(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSave || isVisible.success}
          >
            {isSave ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSave ? "Saving" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectDialog;
