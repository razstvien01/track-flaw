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
import { useEffect, useState } from "react";
import { ROLES } from "@/types/constants";
import AlertSuccess from "@/components/success_alert";
import AlertDestructive from "@/components/alert_destructive";
import { useCurrOrgDataAtom } from "@/hooks/curr_org_data_atom";
import { ShowToast } from "@/components/show-toast";
import { addMemberInOrg, getMembersInOrgs } from "@/services/org.service";
import { useCurrOrgMemberAtom } from "@/hooks/curr_org_members_atom";
import { createNotif } from "@/services/notifications.service";
import { useUserDataAtom } from "@/hooks/user_data_atom";
import { useRefreshNotif } from "@/hooks/refresh_notif-atom";

interface AddMemberSubmitProps {
  user_id: string;
  role: string;
}

const AddMemberSubmitInit: AddMemberSubmitProps = {
  role: "Developer",
  user_id: "",
};

export function AddMemberDialog() {
  const [orgMembers, setOrgMembers] = useCurrOrgMemberAtom()
  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom();
  const [userData, setUserData] = useUserDataAtom();
  const { org_id = "", org_name = "" } = currOrgData || {};
  const [isToggleNotif, setIsToggleNotif] = useRefreshNotif();

  const [addMember, setAddMember] =
    useState<AddMemberSubmitProps>(AddMemberSubmitInit);

  const [isSave, setIsSave] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState({
    success: false,
    error: false,
  });
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [toastParams, setToastParams] = useState<any>({
    title: "",
    description: "",
    variant: "default",
  });
  const [showToast, setShowToast] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);  

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
        setIsToggleNotif(prev => !prev)
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible.success, toastParams, hasSubmitted, setIsToggleNotif]);
  
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
    const result = await addMemberInOrg({ memberData: addMember, org_id });

    if (result.success) {
      
      const { full_name, user_id, photo_url } = userData
      
      const params = {
        user_id,
        org_id,
        photo_url,
        title: "Member Added",
        description: `${full_name} added ${addMember.user_id} with the role of ${addMember.role} in the ${org_name} organization`,
        type: "organization",
      };
      
      await createNotif(params)
      
      setHasSubmitted(true)
      setToastParams({
        title: "Add Member",
        description: "Successfully added a member.",
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
    setAddMember((prev: AddMemberSubmitProps) => ({ ...prev, [id]: value }));
  };

  const handleSelectOnchangeData = (value: string) => {
    setAddMember((prev: AddMemberSubmitProps) => ({
      ...prev,
      role: value,
    }));
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          onClick={() => {}}
          className="h-8 px-2 lg:px-3"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>
            {
              "Please input the user's id and pick his role in this organization."
            }
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>{"User's ID"}</Label>
            <Input
              id="user_id"
              placeholder="Enter the user's id"
              onChange={(e) => handleOnchangeData(e)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Select Role</Label>
            <Select
              onValueChange={(e) => handleSelectOnchangeData(e)}
              value={`${addMember.role}`}
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
            {isSave ? "Adding Member" : "Add Member"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
