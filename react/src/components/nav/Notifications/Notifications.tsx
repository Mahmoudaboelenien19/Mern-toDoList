import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { opacityVariant } from "../../../Variants/options";
import Notification from "./Notification";
import useClickOutside from "../../../customHooks/useClickOutside";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../customHooks/reduxTypes";
import { resetNotificationRoute } from "../../../../routes.js";
import Cookies from "js-cookie";
import { isAuthContext } from "../../../context/isAuthcontext";
import { notificationCounterReset } from "../../../redux/NotificationSlice";
import MobileCloseDropDown from "../../../widget/MobileCloseDropDown";

const Notifications = () => {
  const { isAuth } = useContext(isAuthContext);

  const { counter } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();
  const [isNotificationClicked, setIsNotificationClicked] = useState(false);

  const NOTIFICATIONRef = useClickOutside<HTMLDivElement>(() => {
    if (isNotificationClicked) {
      setIsNotificationClicked(false);
    }
  }, isNotificationClicked);

  const resetNotification = async () => {
    const userId = Cookies.get("user-id");
    await fetch(resetNotificationRoute(userId as string), {
      method: "PATCH",
    });
  };

  const notificationFN = () => {
    setIsNotificationClicked(!isNotificationClicked);
    dispatch(notificationCounterReset());
    resetNotification();
  };
  return (
    <>
      {isAuth && (
        <span className="notification-parent" onClick={notificationFN}>
          <IoNotifications
            size={"2rem"}
            color={"white"}
            style={{ pointerEvents: "none" }}
          />

          <AnimatePresence>
            {counter && (
              <motion.span
                variants={opacityVariant}
                initial="start"
                animate="end"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="notification-counter"
              >
                {counter}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      )}

      <AnimatePresence mode="wait">
        {isNotificationClicked && (
          <div ref={NOTIFICATIONRef} style={{ position: "relative" }}>
            <MobileCloseDropDown setter={setIsNotificationClicked} />

            <Notification />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Notifications;
