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
import { Textarea } from "@/components/ui/textarea";
import { ShowToast } from "@/components/show-toast";
import { useUserDataAtom } from "@/hooks/user_data_atom";
import { createNotif } from "@/services/notifications.service";
import { Dialog } from "@radix-ui/react-dialog";
import { CalendarForm } from "./calendar_form";
import { BugDataProps, ProjectDataProps } from "@/types/types";
import { BugDataInit, ProjectDataInit } from "@/types/init";
import { useCurrOrgDataAtom } from "@/hooks/curr_org_data_atom";
import { createProject } from "@/services/projects.service";
import axios from "axios";
import { BUG_STATUS, PRIORITY, SEVERITY_LVLS } from "@/types/constants";

interface AddProjectDialogProps {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  setSuccessAdd: Dispatch<SetStateAction<boolean>>;
  org_id: string;
  org_name: string;
}

const AddBugDialog = ({
  showDialog,
  setShowDialog,
  setSuccessAdd,
  org_id,
  org_name,
}: AddProjectDialogProps) => {
  const [bugData, setBugData] = useState<BugDataProps>(BugDataInit);
  const [userData, setUserData] = useUserDataAtom();
  const [isSave, setIsSave] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState({
    success: false,
    error: false,
  });

  const [message, setMessage] = useState("");
  const [toastParams, setToastParams] = useState<any>();
  const [showToast, setShowToast] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSelectPrioOnchangeData = (value: string) => {
    setSelectedPriority(value);
  };
  const handleSelectSeverityOnchangeData = (value: string) => {
    setSelectedSeverity(value);
  };
  
  const handleSelectStatusOnchangeData = (value: string) => {
    setSelectedStatus(value);
  };

  useEffect(() => {
    setBugData((prev: BugDataProps) => ({
      ...prev,
      org_id,
    }));
  }, [org_id]);

  useEffect(() => {
    if (hasSubmitted) {
      const timer = setTimeout(() => {
        setIsVisible({
          error: false,
          success: false,
        });
        setShowDialog(false);
        setShowToast(true);
        setIsSave(false);
        setSuccessAdd((prev) => !prev);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [
    isVisible.success,
    toastParams,
    hasSubmitted,
    setShowDialog,
    setSuccessAdd,
  ]);

  useEffect(() => {
    if (showToast) {
      ShowToast(toastParams);
      setShowToast(false);
      setHasSubmitted(false);
    }
  }, [showToast, toastParams]);

  const getActualImageUrl = async () => {
    try {
      // Axios follows redirects by default, so the resolved URL will be the final one after redirection.
      const response = await axios({
        method: "GET",
        url: "https://source.unsplash.com/random/?space,night,star,moon",
        maxRedirects: 5, // The default is 5, but it's set explicitly here for clarity
      });

      return response.request.responseURL; // This should give the final redirected URL
    } catch (error) {
      console.error("Error fetching the actual image URL:", error);
      return ""; // Return an empty string or handle the error as appropriate
    }
  };

  //* Function to handle form submission
  // A function that calls createProject and then createNotif with updated projData.
  const createProjectAndNotify = async (
    imageURL: string,
    userData: any,
    orgData: any
  ) => {
    setIsSave(true); // Indicate that saving is in progress.

    // Set the project data with the new image URL before creating the project.
    // const projectDataWithImage = {
    //   ...bugData,
    //   photo_url: imageURL,
    // };

    // Attempt to create the project using the project data with the actual image URL.
    // const result = await createProject(projectDataWithImage, userData.user_id);

    // if (result.success) {
    //   // Construct parameters for the notification.
    //   const params = {
    //     user_id: userData.user_id,
    //     org_id: orgData.org_id,
    //     photo_url: projectDataWithImage.photo_url,
    //     title: "Project Created",
    //     description: `${userData.full_name} created ${projectDataWithImage.project_name} project in a ${org_name} organization`,
    //     type: "project",
    //   };

    //   // Create a notification for the new project.
    //   await createNotif(params);

    //   // Handle success by setting the success state, toast parameters, and message.
    //   setHasSubmitted(true);
    //   setToastParams({
    //     title: "Creating Project",
    //     description: "You have successfully created a project.",
    //     variant: "default",
    //   });
    //   setMessage(result.data.message); // Adjust this if 'result' structure is different.
    //   setIsVisible({
    //     error: false,
    //     success: true,
    //   });
    // } else {
    //   // Handle errors by setting the error message and visibility.
    //   setMessage(result.error.message);
    //   setIsVisible((prev) => ({
    //     ...prev,
    //     error: true,
    //   }));
    // }

    // setIsSave(false); // Save operation is finished.
  };

  // Function to handle form submission with async image URL fetching.
  const handleSubmit = async () => {
    // Fetch the actual image URL first.
    const actualImage = await getActualImageUrl();
    if (actualImage) {
      await createProjectAndNotify(actualImage, userData, { org_id, org_name });
    } else {
      // Handle the error when the image URL could not be fetched.
      setMessage("Error fetching the image URL.");
      setIsVisible({ success: false, error: true });
    }
  };

  const handleOnchangeData = (e: any) => {
    const { id, value } = e.target;
    setBugData((prev: BugDataProps) => ({ ...prev, [id]: value }));
  };


  const handleCalendarEndData = (date?: Date, field?: any) => {
    if (!date || !field) return;

    field.onChange(date);
    setBugData((prev: BugDataProps) => ({ ...prev, due_date: date }));
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          {" "}
          <DialogTitle>Report Bug</DialogTitle>{" "}
          <DialogDescription>
            {" "}
            {
              "Report a bug you have found in your projects's ongoing initiatives."
            }{" "}
          </DialogDescription>{" "}
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label>Bug name</Label>
              <Input
                id="bug_name"
                placeholder="Enter bug name"
                onChange={(e) => handleOnchangeData(e)}
              />
            </div>
            <CalendarForm
              label="Due Date"
              handleCalendarData={handleCalendarEndData}
            />
            <div className="space-y-2">
              <Label>Bug details</Label>
              <Textarea
                id="bug_description"
                onChange={(e) => handleOnchangeData(e)}
                placeholder="Type your bug details here."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Select Priority</Label>
              <Select
                onValueChange={(e) => handleSelectPrioOnchangeData(e)}
                defaultValue={selectedPriority}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(PRIORITY).map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      <span className="font-medium">{priority}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Select Severity Level</Label>
              <Select
                onValueChange={(e) => handleSelectSeverityOnchangeData(e)}
                defaultValue={selectedSeverity}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                
                <SelectContent>
                  {Object.values(SEVERITY_LVLS).map((severity) => (
                    <SelectItem key={severity} value={severity}>
                      <span className="font-medium">{severity}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Select Severity Level</Label>
              <Select
                onValueChange={(e) => handleSelectStatusOnchangeData(e)}
                defaultValue={selectedStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                
                <SelectContent>
                  {Object.values(BUG_STATUS).map((status) => (
                    <SelectItem key={status} value={status}>
                      <span className="font-medium">{status}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

export default AddBugDialog;
