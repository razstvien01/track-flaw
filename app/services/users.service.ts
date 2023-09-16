import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";

export const useGetUsers = (
  users: any,
  setUsers: Dispatch<SetStateAction<never[]>>
) => {
  useEffect(() => {
    axios
      .get("api/users")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error retrieving users:", error);
      });
  }, [setUsers]);
};

export const addUser = async (user: any) => {
  const { displayName, email, uid, phoneNumber, photoURL } = user;

  await axios.post("http://localhost:3000/api/users", {
    user_id: uid,
    full_name: displayName,
    email_address: email,
    phone_number: phoneNumber,
    photo_url: photoURL,
  });
};
