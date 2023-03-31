import { Link } from "react-router-dom";
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

  const dropDownRef = useRef<HTMLUListElement>(null);
  const navImageRef = useRef<HTMLImageElement>(null);

  // const closeDropDown = (e: any) => {
  //   if (
  //     dropDownRef.current &&
  //     isImageClicked &&
  //     !dropDownRef.current.contains(e.target)
  //   ) {
  //     setShowDropDown(false);
  //     setisImageClicked(false);
  //   }
  // };
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
              width="75"
              height="28"
              viewBox="0 0 75 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.135254 0.785156H1.01416V21H0.135254V0.785156ZM5.40869 0.785156H6.2876V16.6055H13.3188V17.4844H6.2876V18.3633H13.3188V19.2422H6.2876V20.1211H13.3188V21H5.40869V0.785156ZM3.65088 0.785156H4.52979V21H3.65088V0.785156ZM1.89307 0.785156H2.77197V21H1.89307V0.785156Z"
                fill="rgb(0, 191, 128)"
              />
              <path
                d="M17.6367 5.5C17.0201 5.5 16.5034 5.30833 16.0867 4.925C15.6867 4.525 15.4867 4.03333 15.4867 3.45C15.4867 2.86667 15.6867 2.38333 16.0867 2C16.5034 1.6 17.0201 1.4 17.6367 1.4C18.2534 1.4 18.7617 1.6 19.1617 2C19.5784 2.38333 19.7867 2.86667 19.7867 3.45C19.7867 4.03333 19.5784 4.525 19.1617 4.925C18.7617 5.30833 18.2534 5.5 17.6367 5.5ZM19.3617 7.15V21H15.8617V7.15H19.3617ZM28.1197 21.225C26.9864 21.225 25.9697 21.025 25.0697 20.625C24.1697 20.2083 23.4531 19.65 22.9197 18.95C22.4031 18.25 22.1197 17.475 22.0697 16.625H25.5947C25.6614 17.1583 25.9197 17.6 26.3697 17.95C26.8364 18.3 27.4114 18.475 28.0947 18.475C28.7614 18.475 29.2781 18.3417 29.6447 18.075C30.0281 17.8083 30.2197 17.4667 30.2197 17.05C30.2197 16.6 29.9864 16.2667 29.5197 16.05C29.0697 15.8167 28.3447 15.5667 27.3447 15.3C26.3114 15.05 25.4614 14.7917 24.7947 14.525C24.1447 14.2583 23.5781 13.85 23.0947 13.3C22.6281 12.75 22.3947 12.0083 22.3947 11.075C22.3947 10.3083 22.6114 9.60833 23.0447 8.975C23.4947 8.34167 24.1281 7.84167 24.9447 7.475C25.7781 7.10833 26.7531 6.925 27.8697 6.925C29.5197 6.925 30.8364 7.34167 31.8197 8.175C32.8031 8.99167 33.3447 10.1 33.4447 11.5H30.0947C30.0447 10.95 29.8114 10.5167 29.3947 10.2C28.9947 9.86667 28.4531 9.7 27.7697 9.7C27.1364 9.7 26.6447 9.81667 26.2947 10.05C25.9614 10.2833 25.7947 10.6083 25.7947 11.025C25.7947 11.4917 26.0281 11.85 26.4947 12.1C26.9614 12.3333 27.6864 12.575 28.6697 12.825C29.6697 13.075 30.4947 13.3333 31.1447 13.6C31.7947 13.8667 32.3531 14.2833 32.8197 14.85C33.3031 15.4 33.5531 16.1333 33.5697 17.05C33.5697 17.85 33.3447 18.5667 32.8947 19.2C32.4614 19.8333 31.8281 20.3333 30.9947 20.7C30.1781 21.05 29.2197 21.225 28.1197 21.225ZM40.5178 10.025V16.725C40.5178 17.1917 40.6261 17.5333 40.8428 17.75C41.0761 17.95 41.4594 18.05 41.9928 18.05H43.6178V21H41.4178C38.4678 21 36.9928 19.5667 36.9928 16.7V10.025H35.3428V7.15H36.9928V3.725H40.5178V7.15H43.6178V10.025H40.5178ZM47.9102 5.5C47.2935 5.5 46.7768 5.30833 46.3602 4.925C45.9602 4.525 45.7602 4.03333 45.7602 3.45C45.7602 2.86667 45.9602 2.38333 46.3602 2C46.7768 1.6 47.2935 1.4 47.9102 1.4C48.5268 1.4 49.0352 1.6 49.4352 2C49.8518 2.38333 50.0602 2.86667 50.0602 3.45C50.0602 4.03333 49.8518 4.525 49.4352 4.925C49.0352 5.30833 48.5268 5.5 47.9102 5.5ZM49.6352 7.15V21H46.1352V7.15H49.6352ZM59.4432 10.025H57.0182V21H53.4682V10.025H51.8932V7.15H53.4682V6.45C53.4682 4.75 53.9515 3.5 54.9182 2.7C55.8848 1.9 57.3432 1.525 59.2932 1.575V4.525C58.4432 4.50833 57.8515 4.65 57.5182 4.95C57.1848 5.25 57.0182 5.79167 57.0182 6.575V7.15H59.4432V10.025ZM74.9613 7.15L66.3863 27.55H62.6613L65.6613 20.65L60.1113 7.15H64.0363L67.6113 16.825L71.2363 7.15H74.9613Z"
                fill="white"
              />
            </svg>
          </Link>
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
