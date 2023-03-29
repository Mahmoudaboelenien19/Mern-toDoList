import { NavLink, Link } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
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
    userDetails: { username },
    srcImg,
  } = authData;

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
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                initial={{ pathLength: 0, fillOpacity: "0", pathOffset: 1 }}
                animate={{
                  pathLength: 1,
                  fillOpacity: 1,
                  pathOffset: 0,
                  transition: {
                    pathLength: {
                      delay: 0.5,
                      duration: 0.5,
                      ease: "easeOut",
                    },
                    fillOpacity: {
                      delay: 2,
                      ease: "easeInOut",
                    },
                  },
                }}
                fill="var(--created)"
                stroke={"var(--created)"}
                d="M0.49 21V-1.43051e-06H5.35V17.04H15.88V21H0.49Z"
              />
            </svg>

            <svg
              width="73"
              height="31"
              viewBox="0 0 73 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "relative", top: "2.5px", marginLeft: 1 }}
            >
              <motion.path
                initial={{ pathLength: 0, fillOpacity: "0" }}
                animate={{
                  pathLength: 1,
                  fillOpacity: 1,
                  transition: {
                    pathLength: { delay: 1, duration: 1, ease: "easeInOut" },
                    fillOpacity: {
                      delay: 2.5,
                      ease: "easeInOut",
                    },
                  },
                }}
                fill="white"
                stroke={"white"}
                d="M3.90332 6.78418V23H0.460938V6.78418H3.90332ZM2.2041 0.573242C2.73145 0.573242 3.18555 0.714844 3.56641 0.998047C3.95703 1.28125 4.15234 1.76953 4.15234 2.46289C4.15234 3.14648 3.95703 3.63477 3.56641 3.92773C3.18555 4.21094 2.73145 4.35254 2.2041 4.35254C1.65723 4.35254 1.19336 4.21094 0.8125 3.92773C0.441406 3.63477 0.255859 3.14648 0.255859 2.46289C0.255859 1.76953 0.441406 1.28125 0.8125 0.998047C1.19336 0.714844 1.65723 0.573242 2.2041 0.573242ZM19.7383 18.3711C19.7383 19.4355 19.4795 20.334 18.9619 21.0664C18.4443 21.7988 17.6875 22.3555 16.6914 22.7363C15.7051 23.1074 14.4941 23.293 13.0586 23.293C11.9258 23.293 10.9492 23.21 10.1289 23.0439C9.31836 22.8877 8.55176 22.6436 7.8291 22.3115V19.3379C8.60059 19.6992 9.46484 20.0117 10.4219 20.2754C11.3887 20.5391 12.3018 20.6709 13.1611 20.6709C14.2939 20.6709 15.1094 20.4951 15.6074 20.1436C16.1055 19.7822 16.3545 19.3037 16.3545 18.708C16.3545 18.3564 16.252 18.0439 16.0469 17.7705C15.8516 17.4873 15.4805 17.1992 14.9336 16.9062C14.3965 16.6035 13.6055 16.2422 12.5605 15.8223C11.5352 15.4121 10.6709 15.002 9.96777 14.5918C9.26465 14.1816 8.73242 13.6885 8.37109 13.1123C8.00977 12.5264 7.8291 11.7793 7.8291 10.8711C7.8291 9.43555 8.39551 8.34668 9.52832 7.60449C10.6709 6.85254 12.1797 6.47656 14.0547 6.47656C15.0508 6.47656 15.9883 6.5791 16.8672 6.78418C17.7559 6.97949 18.625 7.26758 19.4746 7.64844L18.3906 10.2412C17.6582 9.91895 16.9209 9.65527 16.1787 9.4502C15.4463 9.23535 14.6992 9.12793 13.9375 9.12793C13.0488 9.12793 12.3701 9.26465 11.9014 9.53809C11.4424 9.81152 11.2129 10.2021 11.2129 10.71C11.2129 11.0908 11.3252 11.4131 11.5498 11.6768C11.7744 11.9404 12.1602 12.2041 12.707 12.4678C13.2637 12.7314 14.0352 13.0586 15.0215 13.4492C15.9883 13.8203 16.8232 14.2109 17.5264 14.6211C18.2393 15.0215 18.7861 15.5146 19.167 16.1006C19.5479 16.6865 19.7383 17.4434 19.7383 18.3711ZM29.4941 20.5098C29.9434 20.5098 30.3877 20.4707 30.8271 20.3926C31.2666 20.3047 31.667 20.2021 32.0283 20.085V22.6924C31.6475 22.8584 31.1543 23 30.5488 23.1172C29.9434 23.2344 29.3135 23.293 28.6592 23.293C27.7412 23.293 26.916 23.1416 26.1836 22.8389C25.4512 22.5264 24.8701 21.9941 24.4404 21.2422C24.0107 20.4902 23.7959 19.4502 23.7959 18.1221V9.40625H21.584V7.86816L23.957 6.65234L25.085 3.18066H27.2529V6.78418H31.8965V9.40625H27.2529V18.0781C27.2529 18.8984 27.458 19.5088 27.8682 19.9092C28.2783 20.3096 28.8203 20.5098 29.4941 20.5098ZM38.7666 6.78418V23H35.3242V6.78418H38.7666ZM37.0674 0.573242C37.5947 0.573242 38.0488 0.714844 38.4297 0.998047C38.8203 1.28125 39.0156 1.76953 39.0156 2.46289C39.0156 3.14648 38.8203 3.63477 38.4297 3.92773C38.0488 4.21094 37.5947 4.35254 37.0674 4.35254C36.5205 4.35254 36.0566 4.21094 35.6758 3.92773C35.3047 3.63477 35.1191 3.14648 35.1191 2.46289C35.1191 1.76953 35.3047 1.28125 35.6758 0.998047C36.0566 0.714844 36.5205 0.573242 37.0674 0.573242ZM51.8037 9.40625H47.8633V23H44.4209V9.40625H41.7695V7.75098L44.4209 6.74023V5.6123C44.4209 4.23535 44.6357 3.1416 45.0654 2.33105C45.5049 1.52051 46.1299 0.939453 46.9404 0.587891C47.7607 0.226562 48.7373 0.0458984 49.8701 0.0458984C50.6123 0.0458984 51.291 0.109375 51.9062 0.236328C52.5215 0.353516 53.0391 0.490234 53.459 0.646484L52.5654 3.25391C52.2334 3.14648 51.8623 3.04883 51.4521 2.96094C51.042 2.86328 50.6025 2.81445 50.1338 2.81445C49.3525 2.81445 48.7764 3.05859 48.4053 3.54688C48.0439 4.03516 47.8633 4.74805 47.8633 5.68555V6.78418H51.8037V9.40625ZM52.126 6.78418H55.876L59.2012 16.042C59.3477 16.4619 59.4795 16.877 59.5967 17.2871C59.7236 17.6875 59.8311 18.083 59.9189 18.4736C60.0166 18.8643 60.0947 19.2549 60.1533 19.6455H60.2412C60.3389 19.1377 60.4756 18.5713 60.6514 17.9463C60.8369 17.3115 61.042 16.6768 61.2666 16.042L64.46 6.78418H68.166L61.208 25.2266C60.8076 26.2812 60.3145 27.1797 59.7285 27.9219C59.1523 28.6738 58.4688 29.2402 57.6777 29.6211C56.8867 30.0117 55.9834 30.207 54.9678 30.207C54.4795 30.207 54.0547 30.1777 53.6934 30.1191C53.332 30.0703 53.0244 30.0166 52.7705 29.958V27.2041C52.9756 27.2529 53.2344 27.2969 53.5469 27.3359C53.8594 27.375 54.1816 27.3945 54.5137 27.3945C55.1289 27.3945 55.6611 27.2725 56.1104 27.0283C56.5596 26.7842 56.9404 26.4375 57.2529 25.9883C57.5654 25.5488 57.8242 25.0459 58.0293 24.4795L58.6006 22.9561L52.126 6.78418Z"
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
              {!srcImg ? (
                <div className="skeleton nav-img"> </div>
              ) : (
                <img
                  ref={navImageRef}
                  className="nav-img"
                  src={srcImg}
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
                        className={`${!srcImg ? "skeleton" : ""}nav-img`}
                        src={srcImg && srcImg}
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
            <IoNotifications size={27} color={"gray"} />

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
