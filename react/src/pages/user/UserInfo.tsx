import React, { useEffect, useContext } from "react";
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

  const userDataArr = [
    {
      span: "username",
      value: username,
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
      value: phone,
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
      {userDataArr.map((e, index) => {
        return (
          <motion.div className="parent" variants={opacityVariant} key={e.span}>
            <UpdateUser key={index} {...e} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default UserInfo;
