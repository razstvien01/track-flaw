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

interface OrgSwitcherDialogProps {
  setShowNewOrgDialog: Dispatch<SetStateAction<boolean>>;
}

interface OrgDataDetails {
  org_name: string;
  org_email: string;
  personal: boolean;
  org_url: string;
}

const initOrgDataDetails: OrgDataDetails = {
  org_name: "",
  personal: false,
  org_email: "",
  org_url: "",
};

const OrgSwitcherDialog: React.FC<OrgSwitcherDialogProps> = ({
  setShowNewOrgDialog,
}) => {
  const [orgData, setOrgData] = useState<OrgDataDetails>(initOrgDataDetails);
  const [isSave, setIsSave] = useState<boolean>(false);

  //* Function to handle form submission
  const handleSubmit = () => {
    // console.log(orgData);
    console.log("to submit", orgData);
    // Send a POST request using axios

    setIsSave(true);

    axios
      .post("/api/organizations", {
        ...orgData,
        creator_id: "wwjd8MgJYd0NPpSq9bSy",
      })
      .then((response) => {
        //* Handle a successful response
        console.log("POST request successful");
        console.log("Response data:", response.data);
        setShowNewOrgDialog(false);
        setIsSave(false);
      })
      .catch((error) => {
        //* Handle any errors that occurred during the request
        console.error("POST request failed:", error);
        setShowNewOrgDialog(false);
        setIsSave(false);
      });
  };

  const handleOnchangeData = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setOrgData((prev: OrgDataDetails) => ({ ...prev, [id]: value }));
  };

  const handleSelectOnchangeData = (value: string) => {
    setOrgData((prev: OrgDataDetails) => ({
      ...prev,
      personal: JSON.parse(value),
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
            <Label htmlFor="org_name">Organization name</Label>
            <Input
              id="org_name"
              placeholder="Enter organization name"
              onChange={(e) => handleOnchangeData(e)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org_email">Organization email address</Label>
            <Input
              id="org_email"
              placeholder="Enter organization email address"
              onChange={(e) => handleOnchangeData(e)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personal">Is the organization personal?</Label>
            <Select
              onValueChange={(e) => handleSelectOnchangeData(e)}
              value={`${orgData.personal}`}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select true or false" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">
                  <span className="font-medium">True</span> -{" "}
                  <span className="text-muted-foreground">
                    For personal use, you can only have one.
                  </span>
                </SelectItem>
                <SelectItem value="false">
                  <span className="font-medium">False</span> -{" "}
                  <span className="text-muted-foreground">
                    For organizational use.
                  </span>
                </SelectItem>
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
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setShowNewOrgDialog(false)}>
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit} disabled={isSave}>
          {isSave ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isSave ? "Continue" : "Saving"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default OrgSwitcherDialog;
