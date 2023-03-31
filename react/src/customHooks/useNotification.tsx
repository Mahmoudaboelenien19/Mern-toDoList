import axios from "axios";
import Cookies from "js-cookie";
import { addNotificationRoute } from "../../routes";
import { notificationInterface } from "../redux/NotificationSlice";

const useNotification = () => {
  const addNotificationtoDB = async (obj: notificationInterface) => {
    const userId = Cookies.get("user-id");
    const url = addNotificationRoute(userId as string);
    return await axios.patch(url, obj);
  };

  return { addNotificationtoDB };
};

export default useNotification;
