import { AnimatePresence, motion } from "framer-motion";
import { dropDownVariant } from "../../../Variants/nav";
import { useAppSelector } from "../../../customHooks/reduxTypes";
import NotificationChild from "./NotificationChild";
import { opacityVariant } from "../../../Variants/options";
import { notificationInterface } from "../../../redux/NotificationSlice";
import React, { useEffect, useState } from "react";
import NotificationOptions from "./NotificationOptions";

const Notification = () => {
  const { notificationArr } = useAppSelector((state) => state.notification);

  const [showALl, setShowAll] = useState(true);

  const [dataShown, setdataShown] = useState<notificationInterface[]>(
    [] as notificationInterface[]
  );
  useEffect(() => {
    if (showALl) {
      setdataShown(notificationArr as notificationInterface[]);
    } else {
      setdataShown(notificationArr?.filter((e) => !e.isRead));
    }
  }, [notificationArr, showALl]);

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
      {notificationArr.length >= 1 && (
        <NotificationOptions setShowAll={setShowAll} />
      )}

      <AnimatePresence mode="wait">
        {dataShown?.length > 0 ? (
          <motion.div className=" notification-parent">
            <AnimatePresence>
              {dataShown?.map((e: notificationInterface) => {
                return <NotificationChild key={e?._id} {...e} />;
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
