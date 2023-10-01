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
import axios from "axios";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import AlertSuccess from "./success_alert";
import AlertDestructive from "./alert_destructive";
import { UserAuth } from "../context/auth_context";
import { OrgDataProps } from "../types/types";
import { OrgDataInit } from "../types/init";
import { ROLES } from "../types/constants";
import { Textarea } from "@/components/ui/textarea";

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
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible({
        error: false,
        success: false,
      });
      setShowNewOrgDialog(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isVisible.success, setShowNewOrgDialog]);

  //* Function to handle form submission
  const handleSubmit = () => {
    setIsSave(true);
    axios
      .post("/api/organizations", {
        ...orgData,
        creator_id: uid,
      })
      .then((response) => {
        //* Handle a successful response
        setMessage(response.data.message);
        setIsVisible({
          error: false,
          success: true,
        });
        setIsSave(false);
      })
      .catch((error) => {
        //* Handle any errors that occurred during the request

        setMessage(error.response.data.message);
        setIsVisible((prev) => ({
          ...prev,
          error: true,
        }));
        setIsSave(false);
      });
  };

  const handleOnchangeData = (e: any) => {
    const { id, value } = e.target;
    console.log(id, ":", value);
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
              defaultValue='Admin'
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

                {/* {Object.values(ROLES).map((role) => (
                  <SelectItem key={role} value={role}>
                    <span className="font-medium">{role}</span> -{" "}
                    <span className="text-muted-foreground">
                      {role === ROLES.ADMIN
                        ? "Managing projects and users"
                        : role === ROLES.MANAGER
                        ? "Oversee specific projects"
                        : role === ROLES.TESTER
                        ? "Identifying and reporting bugs"
                        : "Fixing reported bugs and implementing new features"}
                    </span>
                  </SelectItem>
                ))} */}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Organization url</Label>
            <Input
              id="org_url"
              placeholder="Enter organization url"
              onChange={(e) => handleOnchangeData(e)}
            />
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
