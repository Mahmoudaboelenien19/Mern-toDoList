import { motion } from "framer-motion";
import { dropDownVariant } from "../Variants/nav";
import { useAppSelector } from "../customHooks/reduxTypes";
import NotificationChild from "./NotificationChild";

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
      <>
        {notificationArr.length > 0 ? (
          <div className=" notification-parent">
            <h4 className="heading">Notification</h4>
            {notificationArr.map((e, index) => {
              return (
                <>
                  <NotificationChild key={index} {...e} />
                </>
              );
            })}
          </div>
        ) : (
          <span className="nodata">no reminders to show</span>
        )}
      </>
    </motion.div>
  );
};

export default Notification;
