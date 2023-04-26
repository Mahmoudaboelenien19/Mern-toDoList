import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../Variants/options";
import { btnHover } from "../../Variants/globalVariants";
import { isAuthContext } from "../../context/isAuthcontext";
import ProfileImg from "../../components/ProfileImg";
import Avatar from "./Avatar";
import UpdateUser from "./UpdateUser";

const detailsVariant = {
  start: {},
  end: { transition: { staggerChildren: 0.1 } },
};
const User: React.FC = () => {
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

  const [fileKey, setFileKey] = useState<number>(0);
  const [edit, setEdit] = useState(false);
  const [newImg, setnewImg] = useState<File | undefined>();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(true);
    if (event.target.files && event.target.files.length > 0) {
      setnewImg(event.target.files[0]);
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setFileKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (username) {
      document.title = `${username}'s profile`;
    }
  }, [username]);

  return (
    <div id="user-data">
      <div className="img-container">
        <ProfileImg height={150} />
        <form id="form-file" action="/upload">
          <motion.label whileHover={btnHover} htmlFor="file" id="file-label">
            update your profile
            <input
              key={fileKey}
              id="file"
              type="file"
              name="image"
              onChange={handleFileUpload}
            />
          </motion.label>
        </form>
      </div>
      <>
        <AnimatePresence mode="wait">
          {edit && (
            <>
              <Avatar
                setEdit={setEdit}
                handleCancel={handleCancel}
                newImg={newImg}
              />
            </>
          )}
        </AnimatePresence>
      </>

      <motion.div
        className="userDetails"
        variants={detailsVariant}
        initial="start"
        animate="end"
      >
        {userDataArr.map((e, index) => {
          return (
            <motion.div
              className="parent"
              variants={opacityVariant}
              key={e.span}
            >
              <UpdateUser key={index} {...e} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default User;
