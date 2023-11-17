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
import AlertSuccess from "./success_alert";
import AlertDestructive from "./alert_destructive";
import { UserAuth } from "../context/auth_context";
import { OrgDataProps } from "../types/types";
import { OrgDataInit } from "../types/init";
import { ROLES } from "../types/constants";
import { Textarea } from "@/components/ui/textarea";
import { createOrganization } from "../services/org.service";
import { ShowToast } from "@/components/show-toast";
import { useUserDataAtom } from "@/hooks/user_data_atom";
import { createNotif } from "@/services/notifications.service";

interface OrgSwitcherDialogProps {
  setShowNewOrgDialog: Dispatch<SetStateAction<boolean>>;
}

const OrgSwitcherDialog: React.FC<OrgSwitcherDialogProps> = ({
  setShowNewOrgDialog,
}) => {
  const { user } = UserAuth();
  const { uid } = user;
  const [orgData, setOrgData] = useState<OrgDataProps>(OrgDataInit);
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

  useEffect(() => {
    if (hasSubmitted) {
      const timer = setTimeout(() => {
        setIsVisible({
          error: false,
          success: false,
        });
        setShowNewOrgDialog(false);
        setShowToast(true);
        setIsSave(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible.success, toastParams, hasSubmitted, setShowNewOrgDialog]);

  useEffect(() => {
    if (showToast) {
      ShowToast(toastParams);
      setShowToast(false);
      setHasSubmitted(false);
    }
  }, [showToast, toastParams]);

  //* Function to handle form submission
  const handleSubmit = async () => {
    setIsSave(true);

    const result = await createOrganization(orgData, uid);

    if (result.success) {
      const { full_name, user_id, photo_url } = userData;
      const { org_id = "", org_name = "" } = result.data;

      const params = {
        user_id,
        org_id,
        photo_url,
        title: "Organization Created",
        description: `${full_name} created ${org_name} organization`,
        type: "organization",
      };

      await createNotif(params);

      setHasSubmitted(true);
      setToastParams({
        title: "Creating Organization",
        description: "You have successfully created an organization.",
        variant: "default",
      });
      setMessage(result.data.message);
      setIsVisible({
        error: false,
        success: true,
      });
    } else {
      setMessage(result.error.message);
      setIsVisible((prev) => ({
        ...prev,
        error: true,
      }));
    }

    setIsSave(false);
  };

  const handleOnchangeData = (e: any) => {
    const { id, value } = e.target;
    setOrgData((prev: OrgDataProps) => ({ ...prev, [id]: value }));
  };

  const handleSelectOnchangeData = (value: string) => {
    setOrgData((prev: OrgDataProps) => ({
      ...prev,
      role: value,
    }));
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create organization</DialogTitle>
        <DialogDescription>
          Add a new organization to our list of partners to expand our network
          and collaborate on exciting projects.
        </DialogDescription>
      </DialogHeader>
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label>Organization name</Label>
            <Input
              id="org_name"
              placeholder="Enter organization name"
              onChange={(e) => handleOnchangeData(e)}
            />
          </div>
          <div className="space-y-2">
            <Label>Organization address</Label>
            <Input
              id="org_address"
              placeholder="Enter organization address"
              onChange={(e) => handleOnchangeData(e)}
            />
          </div>
          <div className="space-y-2">
            <Label>Organization email address</Label>
            <Input
              id="org_email"
              placeholder="Enter organization email address"
              onChange={(e) => handleOnchangeData(e)}
            />
          </div>
          <div className="space-y-2">
            <Label>Organization phone number</Label>
            <Input
              id="phone_number"
              placeholder="Enter organization phone number"
              onChange={(e) => handleOnchangeData(e)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Select Role</Label>
            <Select
              onValueChange={(e) => handleSelectOnchangeData(e)}
              value={`${orgData.role}`}
              defaultValue="Admin"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select true or false" />
              </SelectTrigger>
              <SelectContent>
                {[ROLES.ADMIN, ROLES.MANAGER].map((role) => (
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
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Organization details</Label>
            <Textarea
              id="org_details"
              onChange={(e) => handleOnchangeData(e)}
              placeholder="Type your organization details here."
            />
          </div>
        </div>
      </div>
      {isVisible.success ? <AlertSuccess description={message} /> : null}
      {isVisible.error ? <AlertDestructive description={message} /> : null}
      <DialogFooter>
        <Button variant="outline" onClick={() => setShowNewOrgDialog(false)}>
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
  );
};

export default OrgSwitcherDialog;
