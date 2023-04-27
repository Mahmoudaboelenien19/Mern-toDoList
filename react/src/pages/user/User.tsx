import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { btnHover } from "../../Variants/globalVariants";
import ProfileImg from "../../widget/ProfileImg";
import Avatar from "./Avatar";
import UserInfo from "./UserInfo";

const User: React.FC = () => {
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
      <UserInfo />
    </div>
  );
};

export default User;
