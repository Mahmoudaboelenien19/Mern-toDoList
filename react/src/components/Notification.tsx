import { AnimatePresence, motion } from "framer-motion";
import { dropDownVariant } from "../Variants/nav";
import { useAppDispatch, useAppSelector } from "../customHooks/reduxTypes";
import NotificationChild from "./NotificationChild";
import { opacityVariant } from "../Variants/options";
import { linkHover } from "../Variants/globalVariants";
import Cookies from "js-cookie";
import { markALlNotificationsRoute } from "../../routes";
import { markALlRead, notificationInterface } from "../redux/NotificationSlice";
import { useEffect, useMemo, useState } from "react";

const Notification = () => {
  const { notificationArr } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();
  const handleMarkAllNotifications = async () => {
    const userId = Cookies.get("user-id");
    console.log("markAll");
    await fetch(markALlNotificationsRoute(userId as string), {
      method: "PATCH",
    });
  };

  const [showALl, setShowAll] = useState(true);

  // const dataShown = useMemo(() => {
  //   if (showALl) {
  //     return notificationArr;
  //   } else {
  //     return notificationArr.filter((e) => !e.isRead);
  //   }
  // }, [notificationArr, showALl]);

  const [dataShown, setdataShown] = useState([]);
  useEffect(() => {
    if (showALl) {
      setdataShown(notificationArr as any);
    } else {
      setdataShown(notificationArr.filter((e) => !e.isRead) as any);
    }
  }, [notificationArr, showALl]);
  console.log(dataShown);
  return (
    <motion.div
      key={"notification"}
      className="dropdown notification"
      variants={dropDownVariant}
      initial="start"
      exit="exit"
      animate="end"
    >
      <h4 className="heading">Notification</h4>
      <div className="header">
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
              fontWeight: 900,
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

      <AnimatePresence mode="wait">
        {dataShown.length > 0 ? (
          <motion.div className=" notification-parent">
            <AnimatePresence>
              {dataShown.map((e: notificationInterface, index) => {
                return <NotificationChild key={e._id} {...e} />;
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.span
            variants={opacityVariant}
            initial="start"
            animate="end"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="nodata"
            key={"no-reminders"}
          >
            no reminders to show
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Notification;
