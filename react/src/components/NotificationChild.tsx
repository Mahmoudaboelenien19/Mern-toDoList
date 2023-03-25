import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { deleteNotificationRoute } from "../../routes";
import { useAppDispatch } from "../customHooks/reduxTypes";
import {
  isReadNotification,
  removeNotification,
} from "../redux/NotificationSlice";

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

  return (
    <div className={`${isRead ? "is-read" : ""} notificattion-child`}>
      <>
        <small>
          <span>you {state} </span>
          <small className="content">{content}</small>
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
    </div>
  );
};

export default NotificationChild;
