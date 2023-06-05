import React, { useContext } from "react";
import useClickOutside from "../../customHooks/useClickOutside";
import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";
import { dropDownVariant } from "../../Variants/nav";
import { AiOutlineUser } from "react-icons/ai";
import ProfileImg from "../../widget/ProfileImg";
import { isAuthContext } from "../../context/isAuthcontext";
import { logOutRoute } from "../../../routes";
import Cookies from "js-cookie";
import axios from "axios";
import { GiExitDoor } from "react-icons/gi";
import UserDropDownLink from "./UserDropDownLink";

interface Props {
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  showDropDown: boolean;
}

const UserDropDown = ({ setShowDropDown, showDropDown }: Props) => {
  const {
    setIsAuth,
    userDetails: { username },
  } = useContext(isAuthContext);

  const dropRef = useClickOutside<HTMLUListElement>(
    () => setShowDropDown(false),
    showDropDown
  );

  const handleLogOut = async () => {
    await axios.post(
      logOutRoute,
      { refToken: Cookies.get("refresh-token") },
      { withCredentials: true }
    );
    setIsAuth(false);
  };
  const userDropArr = [
    { to: "/userProfile", Icon: AiOutlineUser, link: "update your profile" },
    { to: "/faq", Icon: FaQuestionCircle, link: "FAQ" },
    { to: "/login", Icon: GiExitDoor, link: "log out", fn: handleLogOut },
  ];

  return (
    <motion.ul
      ref={dropRef}
      key={"dropdown"}
      className="dropdown"
      variants={dropDownVariant}
      initial="start"
      exit="exit"
      style={{ width: 150 }}
      animate="end"
    >
      <li className="user-data">
        <ProfileImg height={30} />
        <span>{username}</span>
      </li>

      {userDropArr.map((li, i) => {
        return <UserDropDownLink key={i} {...li}></UserDropDownLink>;
      })}
    </motion.ul>
  );
};

export default UserDropDown;
