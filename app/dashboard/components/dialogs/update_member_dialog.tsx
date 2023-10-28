import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, PlusIcon } from "lucide-react";
import { Dispatch, useEffect, useState, SetStateAction } from "react";
import { ROLES } from "@/types/constants";
import AlertSuccess from "@/components/success_alert";
import AlertDestructive from "@/components/alert_destructive";
import { useCurrOrgDataAtom } from "@/hooks/curr_org_data_atom";
import { ShowToast } from "@/components/show-toast";
import { addMemberInOrg, getMembersInOrgs, updateMemberInOrg } from "@/services/org.service";
import { useCurrOrgMemberAtom } from "@/hooks/curr_org_members_atom";
import { createNotif } from "@/services/notifications.service";
import { useUserDataAtom } from "@/hooks/user_data_atom";

interface UpdateMemberSubmitProps {
  role: string;
}

interface UpdateMemberDialogProps {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  currentRole: string;
  member_id: string
  name: string
}

export function UpdateMemberDialog({
  showDialog,
  setShowDialog,
  currentRole,
  member_id,
  name
}: UpdateMemberDialogProps) {
  const [orgMembers, setOrgMembers] = useCurrOrgMemberAtom();
  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom();
  const { org_id = "", org_name = "" } = currOrgData || {};
  
  const [updateMember, setUpdateMember] = useState<UpdateMemberSubmitProps>({
    role: currentRole.toLowerCase().charAt(0).toUpperCase() + currentRole.slice(1).toLowerCase(),
  });

  const [isSave, setIsSave] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState({
    success: false,
    error: false,
  });
  const [message, setMessage] = useState("");
  // const [showDialog, setShowDialog] = useState<boolean>(false);
  const [toastParams, setToastParams] = useState<any>({
    title: "",
    description: "",
    variant: "default",
  });
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
        setIsSave(false);
        setShowDialog(false);
        setShowToast(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible.success, toastParams, hasSubmitted, setShowDialog]);

  useEffect(() => {
    if (showToast) {
      ShowToast(toastParams);
      setShowToast(false);
      setHasSubmitted(false);

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
    }
  }, [showToast, toastParams, setOrgMembers, org_id]);

  //* Function to handle form submission
  const handleSubmit = async () => {
    setIsSave(true);
    const result = await updateMemberInOrg({ memberData: updateMember, org_id, user_id: member_id });

    if (result.success) {
      
      const { full_name, user_id, photo_url } = userData
      
      const params = {
        user_id,
        org_id,
        photo_url,
        title: "Member Updated",
        description: `${full_name} updated ${name}'s role into ${updateMember.role} in the ${org_name} organization`,
        type: "organization",
      };
      
      await createNotif(params)
      
      setHasSubmitted(true);
      setToastParams({
        title: "Update Member",
        description: "Successfully updated a member.",
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

  const handleSelectOnchangeData = (value: string) => {
    setUpdateMember((prev: UpdateMemberSubmitProps) => ({
      ...prev,
      role: value,
    }));
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Member</DialogTitle>
          <DialogDescription>
            {"Please update the member's role in this organization."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="role">Select Role</Label>
            <Select
              onValueChange={(e) => handleSelectOnchangeData(e)}
              value={`${updateMember.role}`}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select true or false" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ROLES).map((role) => (
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
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {isVisible.success ? <AlertSuccess description={message} /> : null}
        {isVisible.error ? <AlertDestructive description={message} /> : null}
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSave || isVisible.success}
          >
            {isSave ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSave ? "Updating Member" : "Update Member"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
