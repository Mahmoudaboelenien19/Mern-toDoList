import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../Variants/options";
import { btnHover, linkHover } from "../Variants/globalVariants";
import { isAuthContext } from "../context/isAuthcontext";
import axios from "axios";
import { updateUserImageRoute, updateUserRoute } from "../../routes";
import Cookies from "js-cookie";
import AvatarEditor from "react-avatar-editor";
import { avatarVariant, overleyVariant } from "../Variants/user";
import UpdateUser from "./UpdateUser";
import { generateNewToken } from "../redux/Taskslice";

const detailsVariant = {
  start: {},
  end: { transition: { staggerChildren: 0.1 } },
};
const User: React.FC = () => {
  const authData = useContext(isAuthContext);
  const {
    userDetails: { username, country, email, gender, phone },
  } = authData;

  const [profile, setProfile] = useState<File | undefined>();
  const [newImg, setnewImg] = useState<File | undefined>();

  //this for if user cancelled and then chose same image the on change fn works
  const [fileKey, setFileKey] = useState<number>(0);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(true);
    if (event.target.files && event.target.files.length > 0) {
      setnewImg(event.target.files[0]);
    }
  };

  const handleUpdateImage = async () => {
    const userId = Cookies.get("user-id");
    const { accessToken } = await generateNewToken();

    // Convert data URL to Blob
    const canvas = editorRef.current.getImageScaledToCanvas();
    const dataURL = canvas.toDataURL("image/jpeg");
    const blob = await fetch(dataURL).then((res) => res.blob());
    const file = new File(
      [blob],
      `${Date.now()}-${Math.random().toString(16)}-${newImg!.name}`,
      { type: "image/jpeg" }
    );
    const formData = new FormData();
    formData.append("image", file as any);
    return await axios.patch(updateUserImageRoute(userId as string), formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const [edit, setEdit] = useState(false);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const editorRef = useRef<AvatarEditor>(null!);

  interface positionInterface {
    x: number;
    y: number;
  }
  const handlePositionChange = (position: positionInterface) => {
    setPosition(position);
  };

  function handleSaveButtonClick() {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImage = canvas.toDataURL();
      setEdit(false);
      handleUpdateImage();
      setProfile(croppedImage as any);
    }
  }

  const [scale, setScale] = useState(0);
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value));
  };
  const handleCancel = () => {
    setEdit(false);
    setFileKey((prev) => prev + 1);
  };

  return (
    <div id="user-data">
      <div className="img-container">
        <img
          // className={!srcImg ? "skeleton" : ""}
          id="profile"
          src={profile as any}
        />
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
            <motion.div
              variants={overleyVariant}
              animate="end"
              exit="exit"
              initial="start"
              id="overley"
              key={"overley"}
            >
              <motion.div key={"avatar"} id="avatar" variants={avatarVariant}>
                <h4 style={{ marginBottom: 40 }} className="heading">
                  update your profile image
                </h4>
                <AvatarEditor
                  style={{ backgroundColor: "white", border: "0" }}
                  ref={editorRef}
                  image={URL.createObjectURL(newImg as any)}
                  width={250}
                  height={250}
                  border={5}
                  borderRadius={125}
                  position={position}
                  onPositionChange={handlePositionChange}
                  scale={1 + scale}
                />
                <div className="zoom-cont">
                  <label htmlFor="zoom"> zoom</label>
                  <input
                    type="range"
                    id="zoom"
                    onChange={handleScaleChange}
                    min="0"
                    max="1"
                    step=".01"
                    defaultValue={0.01}
                  />
                </div>
                <div className="btn-container">
                  <motion.button
                    whileHover={btnHover}
                    className="btn save"
                    onClick={handleSaveButtonClick}
                  >
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={btnHover}
                    className="btn cancel"
                    onClick={handleCancel}
                  >
                    cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
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
