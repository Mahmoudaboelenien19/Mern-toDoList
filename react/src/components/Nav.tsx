import { NavLink, Link } from "react-router-dom";
import React, { useContext, useRef, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import NavRoutes from "../widget/routes";
import { AnimatePresence, motion } from "framer-motion";
import { logOutRoute, resetNotificationRoute } from "../../routes";
import { isAuthContext } from "../context/isAuthcontext";
import axios from "axios";
import Cookies from "js-cookie";
import { AiOutlineUser } from "react-icons/ai";
import { GiExitDoor } from "react-icons/gi";
import { dropDownVariant } from "../Variants/nav";
import { FaQuestionCircle } from "react-icons/fa";
import Notification from "./Notification";
import { useAppDispatch, useAppSelector } from "../customHooks/reduxTypes";
import { notificationCounterReset } from "../redux/NotificationSlice";
import { opacityVariant } from "../Variants/options";

const Nav: React.FC = () => {
  const { counter } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  const authData = useContext(isAuthContext);
  const {
    isAuth,
    setIsAuth,
    userDetails: { username, image },
  } = authData;

  console.log(image);

  const handleLogOut = async () =>
    await axios.post(
      logOutRoute,
      { refToken: Cookies.get("refresh-token") },
      { withCredentials: true }
    );

  const resetNotification = async () => {
    const userId = Cookies.get("user-id");
    await fetch(resetNotificationRoute(userId as string), {
      method: "PATCH",
    });
  };

  //todo when click outside not work
  const [showDropDown, setShowDropDown] = useState(false);
  const [isImageClicked, setisImageClicked] = useState(false);

  const dropDownRef = useRef<HTMLUListElement>(null!);
  const navImageRef = useRef<HTMLImageElement>(null!);
  const closeDropDown = (e: any) => {
    if (
      dropDownRef.current &&
      isImageClicked &&
      !dropDownRef.current.contains(e.target)
    ) {
      setShowDropDown(false);
      setisImageClicked(false);
    }
  };
  // useEffect(() => {
  // document.addEventListener("click", closeDropDown);
  // return () => document.removeEventListener("click", closeDropDown);
  // }, [isImageClicked]);

  const [isNotificationClicked, setIsNotificationClicked] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div id="logo">
          <Link to="/">
            <svg
              width="91"
              height="33"
              viewBox="0 0 91 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.362305 0.742188H1.41699V25H0.362305V0.742188ZM6.69043 0.742188H7.74512V19.7266H16.1826V20.7812H7.74512V21.8359H16.1826V22.8906H7.74512V23.9453H16.1826V25H6.69043V0.742188ZM4.58105 0.742188H5.63574V25H4.58105V0.742188ZM2.47168 0.742188H3.52637V25H2.47168V0.742188Z"
                fill="rgb(0, 191, 128)"
              />
              <path
                d="M21.3641 6.4C20.6241 6.4 20.0041 6.17 19.5041 5.71C19.0241 5.23 18.7841 4.64 18.7841 3.94C18.7841 3.24 19.0241 2.66 19.5041 2.2C20.0041 1.72 20.6241 1.48 21.3641 1.48C22.1041 1.48 22.7141 1.72 23.1941 2.2C23.6941 2.66 23.9441 3.24 23.9441 3.94C23.9441 4.64 23.6941 5.23 23.1941 5.71C22.7141 6.17 22.1041 6.4 21.3641 6.4ZM23.4341 8.38V25H19.2341V8.38H23.4341ZM33.9437 25.27C32.5837 25.27 31.3637 25.03 30.2837 24.55C29.2037 24.05 28.3437 23.38 27.7037 22.54C27.0837 21.7 26.7437 20.77 26.6837 19.75H30.9137C30.9937 20.39 31.3037 20.92 31.8437 21.34C32.4037 21.76 33.0937 21.97 33.9137 21.97C34.7137 21.97 35.3337 21.81 35.7737 21.49C36.2337 21.17 36.4637 20.76 36.4637 20.26C36.4637 19.72 36.1837 19.32 35.6237 19.06C35.0837 18.78 34.2137 18.48 33.0137 18.16C31.7737 17.86 30.7537 17.55 29.9537 17.23C29.1737 16.91 28.4937 16.42 27.9137 15.76C27.3537 15.1 27.0737 14.21 27.0737 13.09C27.0737 12.17 27.3337 11.33 27.8537 10.57C28.3937 9.81 29.1537 9.21 30.1337 8.77C31.1337 8.33 32.3037 8.11 33.6437 8.11C35.6237 8.11 37.2037 8.61 38.3837 9.61C39.5637 10.59 40.2137 11.92 40.3337 13.6H36.3137C36.2537 12.94 35.9737 12.42 35.4737 12.04C34.9937 11.64 34.3437 11.44 33.5237 11.44C32.7637 11.44 32.1737 11.58 31.7537 11.86C31.3537 12.14 31.1537 12.53 31.1537 13.03C31.1537 13.59 31.4337 14.02 31.9937 14.32C32.5537 14.6 33.4237 14.89 34.6037 15.19C35.8037 15.49 36.7937 15.8 37.5737 16.12C38.3537 16.44 39.0237 16.94 39.5837 17.62C40.1637 18.28 40.4637 19.16 40.4837 20.26C40.4837 21.22 40.2137 22.08 39.6737 22.84C39.1537 23.6 38.3937 24.2 37.3937 24.64C36.4137 25.06 35.2637 25.27 33.9437 25.27ZM48.8213 11.83V19.87C48.8213 20.43 48.9513 20.84 49.2113 21.1C49.4913 21.34 49.9513 21.46 50.5913 21.46H52.5413V25H49.9013C46.3613 25 44.5913 23.28 44.5913 19.84V11.83H42.6113V8.38H44.5913V4.27H48.8213V8.38H52.5413V11.83H48.8213ZM57.6922 6.4C56.9522 6.4 56.3322 6.17 55.8322 5.71C55.3522 5.23 55.1122 4.64 55.1122 3.94C55.1122 3.24 55.3522 2.66 55.8322 2.2C56.3322 1.72 56.9522 1.48 57.6922 1.48C58.4322 1.48 59.0422 1.72 59.5222 2.2C60.0222 2.66 60.2722 3.24 60.2722 3.94C60.2722 4.64 60.0222 5.23 59.5222 5.71C59.0422 6.17 58.4322 6.4 57.6922 6.4ZM59.7622 8.38V25H55.5622V8.38H59.7622ZM71.5318 11.83H68.6218V25H64.3618V11.83H62.4718V8.38H64.3618V7.54C64.3618 5.5 64.9418 4 66.1018 3.04C67.2618 2.08 69.0118 1.63 71.3518 1.69V5.23C70.3318 5.21 69.6218 5.38 69.2218 5.74C68.8218 6.1 68.6218 6.75 68.6218 7.69V8.38H71.5318V11.83ZM90.1536 8.38L79.8636 32.86H75.3936L78.9936 24.58L72.3336 8.38H77.0436L81.3336 19.99L85.6836 8.38H90.1536Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>

        <div id="links">
          <NavLink to="/">tasks</NavLink>
          <NavLink to="/setting">settings</NavLink>
        </div>

        <div id="login-state">
          {isAuth ? (
            <>
              {true ? (
                <div className="skeleton nav-img"> </div>
              ) : (
                <img
                  ref={navImageRef}
                  className="nav-img"
                  // src={}
                  title={`${username}s profile`}
                  onClick={() => {
                    setisImageClicked(true);
                    setShowDropDown(!showDropDown);
                    setIsNotificationClicked(false);
                  }}
                />
              )}
              <AnimatePresence mode="wait">
                {showDropDown && isImageClicked && (
                  <motion.ul
                    ref={dropDownRef}
                    key={"dropdown"}
                    className="dropdown"
                    variants={dropDownVariant}
                    initial="start"
                    exit="exit"
                    animate="end"
                  >
                    <li className="user-data">
                      <img
                      // className={`${!srcImg ? "skeleton" : ""}nav-img`}
                      // src={srcImg && srcImg}
                      // alt="user"
                      />
                      <span>{username}</span>
                    </li>

                    <li>
                      <span className="nav-icon">
                        <AiOutlineUser />
                      </span>
                      <Link to="/user">update profile</Link>
                    </li>
                    <li>
                      <span className="nav-icon">
                        <FaQuestionCircle />
                      </span>
                      <Link to="/faq">FAQ</Link>
                    </li>
                    <li>
                      <span className="nav-icon">
                        <GiExitDoor />
                      </span>
                      <Link
                        to="/login"
                        onClick={() => {
                          handleLogOut();
                          setIsAuth(false);
                        }}
                      >
                        logout
                      </Link>
                    </li>
                  </motion.ul>
                )}{" "}
              </AnimatePresence>
            </>
          ) : (
            <>
              <Link className="login-link" to="/login">
                log in
              </Link>
            </>
          )}

          <span
            className="notification-parent"
            onClick={() => {
              setIsNotificationClicked(!isNotificationClicked);
              setShowDropDown(false);
              dispatch(notificationCounterReset());
              resetNotification();
            }}
          >
            <IoNotifications size={27} color={"white"} />

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

          <AnimatePresence mode="wait">
            {isNotificationClicked && (
              <>
                {" "}
                <Notification />
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <NavRoutes />
    </>
  );
};

export default Nav;
