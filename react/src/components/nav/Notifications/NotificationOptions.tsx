import { motion } from "framer-motion";
import React from "react";
import { linkHover } from "../../../Variants/globalVariants";
import { markALlRead } from "../../../redux/NotificationSlice";
import Cookies from "js-cookie";
import { markALlNotificationsRoute } from "../../../../routes";
import { useAppDispatch } from "../../../customHooks/reduxTypes";

interface Props {
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
}
const NotificationOptions = ({ setShowAll }: Props) => {
  const dispatch = useAppDispatch();
  const handleMarkAllNotifications = async () => {
    const userId = Cookies.get("user-id");
    console.log("markAll");
    await fetch(markALlNotificationsRoute(userId as string), {
      method: "PATCH",
    });
  };
  return (
    <div className="notification-header">
      <span>
        <motion.button
          whileHover={{
            ...linkHover,
            color: "var(--border)",
          }}
          className="btn"
          onClick={() => setShowAll(true)}
        >
          all
        </motion.button>
        <motion.button
          whileHover={{
            ...linkHover,
            color: "var(--border)",
          }}
          className="btn"
          onClick={() => setShowAll(false)}
        >
          unread
        </motion.button>
      </span>
      <span>
        <motion.button
          whileHover={{
            ...linkHover,
            color: "var(--delete)",
          }}
          className="btn "
          onClick={() => {
            handleMarkAllNotifications();
            dispatch(markALlRead());
          }}
        >
          mark all as read
        </motion.button>
      </span>
    </div>
  );
};

export default NotificationOptions;
