import axios from "axios";
import Cookies from "js-cookie";
import { deleteNotificationRoute } from "../../routes";
import { useAppDispatch } from "../customHooks/reduxTypes";
import {
  isReadNotification,
  removeNotification,
} from "../redux/NotificationSlice";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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
    const url = deleteNotificationRoute(userId as string, _id!);
    return await axios.delete(url);
  };

  const readNotificationFromDB = async () => {
    const userId = Cookies.get("user-id");
    const url = deleteNotificationRoute(userId as string, _id!);
    return await axios.patch(url);
  };

  const notivariant = {
    start: { opacity: 0 },
    end: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className={`${isRead ? "is-read" : ""} notificattion-child`}
      variants={notivariant}
      exit="exit"
      animate="end"
      initial="start"
      key={content}
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
          <button
            className="btn read"
            onClick={() => {
              dispatch(isReadNotification(_id!));
              readNotificationFromDB();
            }}
          >
            mark as read
          </button>
        )}
      </small>
      <button
        className="btn del"
        onClick={() => {
          dispatch(removeNotification(_id));
          removeNotificationFromDB();
        }}
      >
        x
      </button>
    </motion.div>
  );
};

export default NotificationChild;
