import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import NavRoutes from "../../widget/routes";
import { AnimatePresence, motion } from "framer-motion";
import { resetNotificationRoute } from "../../../routes";
import { isAuthContext } from "../../context/isAuthcontext";
import Cookies from "js-cookie";
import Notification from "./Notification";
import { useAppDispatch, useAppSelector } from "../../customHooks/reduxTypes";
import { notificationCounterReset } from "../../redux/NotificationSlice";
import { opacityVariant } from "../../Variants/options";
import useClickOutside from "../../customHooks/useClickOutside";
import ProfileImg from "../../widget/ProfileImg";
import UserDropDown from "../../pages/user/UserDropDown";
import Logo from "./Logo";

const Nav: React.FC = () => {
  const { counter } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  const authData = useContext(isAuthContext);
  const {
    isAuth,
    profile,
    userDetails: { username },
  } = authData;

  const resetNotification = async () => {
    const userId = Cookies.get("user-id");
    await fetch(resetNotificationRoute(userId as string), {
      method: "PATCH",
    });
  };

  const [isNotificationClicked, setIsNotificationClicked] = useState(false);

  const NOTIFICATIONRef = useClickOutside<HTMLDivElement>(() => {
    setIsNotificationClicked(false);
  });

  const notificationFN = () => {
    if (!isNotificationClicked) {
      setIsNotificationClicked(true);
      dispatch(notificationCounterReset());
      resetNotification();
    }
  };
  const [showDropDown, setShowDropDown] = useState(false);
  const imgFn = () => {
    if (!showDropDown) {
      setShowDropDown(true);
    }
  };
  return (
    <>
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div id="logo">
          <Logo />
        </div>
        <div id="login-state">
          {isAuth ? (
            <>
              {!profile ? (
                <div className="skeleton nav-img"> </div>
              ) : (
                <>
                  <ProfileImg
                    height={30}
                    title={`${username}s profile`}
                    fn={imgFn}
                  />
                </>
              )}
              <AnimatePresence mode="wait">
                {showDropDown && (
                  <>
                    <UserDropDown setShowDropDown={setShowDropDown} />
                  </>
                )}
              </AnimatePresence>
            </>
          ) : (
            <>
              <Link className="login-link" to="/login">
                log in
              </Link>
            </>
          )}

          {isAuth && (
            <span className="notification-parent" onClick={notificationFN}>
              <IoNotifications size={"2rem"} color={"white"} />

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
              <div ref={NOTIFICATIONRef}>
                {" "}
                <Notification />
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <NavRoutes />
    </>
  );
};

export default Nav;
