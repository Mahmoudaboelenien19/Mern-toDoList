import React, { useEffect, useContext, useState } from "react";
import { isAuthContext } from "../../context/isAuthcontext";
import { motion } from "framer-motion";
import { opacityVariant } from "../../Variants/options";
import UpdateUser from "./UpdateUser";

const detailsVariant = {
  start: {},
  end: { transition: { staggerChildren: 0.1 } },
};
const UserInfo = () => {
  const authData = useContext(isAuthContext);
  const {
    userDetails: { username, country, email, gender, phone },
  } = authData;

  const [userData, setUserData] = useState({
    phone,
    username,
  });
  const userDataArr = [
    {
      span: "username",
      value: userData.username,
    },
    {
      span: "email",
      value: email,
    },
    {
      span: "country",
      value: country,
    },
    {
      span: "password",
      value: "************",
    },
    {
      span: "phone",
      value: userData.phone,
    },
    {
      span: "gender",
      value: gender,
    },
  ];

  useEffect(() => {
    if (username) {
      document.title = `${username}'s profile`;
    }
  }, [username]);
  return (
    <motion.div
      className="userDetails"
      variants={detailsVariant}
      initial="start"
      animate="end"
    >
      {userDataArr.map((ob, index) => {
        return (
          <motion.div
            className="parent"
            variants={opacityVariant}
            key={ob.span}
          >
            <UpdateUser key={index} {...ob} setUserData={setUserData} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default UserInfo;
