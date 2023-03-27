import { AnimatePresence, motion } from "framer-motion";
import { dropDownVariant } from "../Variants/nav";
import { useAppSelector } from "../customHooks/reduxTypes";
import NotificationChild from "./NotificationChild";
import { opacityVariant } from "../Variants/options";

const Notification = () => {
  const { notificationArr } = useAppSelector((state) => state.notification);

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

      <AnimatePresence mode="wait">
        {notificationArr.length > 0 ? (
          <motion.div className=" notification-parent">
            <AnimatePresence>
              {notificationArr.map((e, index) => {
                console.log({ [index]: e._id });
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
