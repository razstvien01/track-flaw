import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";
import { UserDataProps } from "../types/types";
import { useCurrRoleAtom } from "@/hooks/curr_role_data_atom";

export const useGetUsers = (setUsers: Dispatch<SetStateAction<never[]>>) => {
  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error retrieving users:", error);
      });
  }, [setUsers]);
};

export const useGetUser = (
  user_id: string,
  setUser: Dispatch<SetStateAction<UserDataProps>>,
  isUpdate?: boolean,
  showNewOrgDialog?: boolean
) => {
  const [currRole, setCurrRole] = useCurrRoleAtom();
  useEffect(() => {
    const params = {
      query: "GET_USER",
      user_id,
    };
    
    axios
      .get("/api/users", {
        params,
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error retrieving users:", error);
      });
  }, [setUser, user_id, isUpdate, showNewOrgDialog, currRole]);
};

export const updateUser = async (newUserData: any, user_id: string) => {
  try {
    const { org_refs, ...newUser } = newUserData;
    const response = await axios.put("/api/users", {
      ...newUser,
      user_id: user_id,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const addUser = async (user: any) => {
  const { displayName, email, uid, phoneNumber, photoURL } = user;

  await axios.post("/api/users", {
    user_id: uid,
    full_name: displayName,
    email_address: email,
    phone_number: phoneNumber,
    photo_url: photoURL,
  });
};