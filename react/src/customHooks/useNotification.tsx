import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { addNotificationRoute } from "../../routes";

const useNotification = () => {
  const addNotificationtoDB = async (obj: any) => {
    const userId = Cookies.get("user-id");
    const url = addNotificationRoute(userId as string);
    return await axios.patch(url, obj);
  };

  return { addNotificationtoDB };
};

export default useNotification;
