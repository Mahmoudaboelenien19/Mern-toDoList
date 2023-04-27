import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { deleteNotificationRoute } from "../../../routes";
import { useAppDispatch } from "../../customHooks/reduxTypes";
import {
  isReadNotification,
  removeNotification,
} from "../../redux/NotificationSlice";
import { motion } from "framer-motion";
import { linkHover } from "../../Variants/globalVariants";
interface Props {
  state: string;
  time: string;
  isRead: boolean;
  content: string;
  _id?: string;
}
const NotificationChild = ({ time, state, isRead, content, _id }: Props) => {
  const dispatch = useAppDispatch();

  const removeNotificationFromDB = async () => {
    const userId = Cookies.get("user-id");
    const url = deleteNotificationRoute(userId as string, _id as string);
    return await axios.delete(url);
  };

  const readNotificationFromDB = async () => {
    const userId = Cookies.get("user-id");
    const url = deleteNotificationRoute(userId as string, _id as string);
    return await axios.patch(url);
  };

  const notivariant = {
    start: { opacity: 0 },
    end: {
      opacity: 1,

      transition: { delay: 0.1, duration: 0.4 },
    },
    exit: { opacity: 0, x: 10, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className={`${isRead ? "is-read" : ""} notificattion-child`}
      variants={notivariant}
      initial="start"
      animate="end"
      exit="exit"
    >
      <>
        <small>
          <span>
            you
            <span
              style={{
                color: state.startsWith("added")
                  ? `var(--unchecked)`
                  : `var(--${state})`,
                fontWeight: "900",
                textShadow: ".5px .7px 0px black",
                letterSpacing: 0.8,
              }}
            >
              {" "}
              {state}{" "}
            </span>
          </span>
          <small>{content}</small>
        </small>
      </>
      <small>
        <span className="time">{time} </span>

        {!isRead && (
          <motion.button
            whileHover={linkHover}
            className="btn read"
            onClick={() => {
              dispatch(isReadNotification(_id as string));
              readNotificationFromDB();
            }}
          >
            mark as read
          </motion.button>
        )}
      </small>
      <motion.button
        className="btn del"
        onClick={() => {
          removeNotificationFromDB();

          dispatch(removeNotification(_id));
        }}
      >
        x
      </motion.button>
    </motion.div>
  );
};

export default NotificationChild;
