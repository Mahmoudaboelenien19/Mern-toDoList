import React, { useContext, useRef, useState } from "react";
import { overleyVariant, avatarVariant } from "../../Variants/user";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { generateNewToken } from "../../redux/Taskslice";
import axios from "axios";
import { updateUserImageRoute } from "../../../routes";
import AvatarEditor from "react-avatar-editor";
import { btnHover } from "../../Variants/globalVariants";
import { isAuthContext } from "../../context/isAuthcontext";

interface Props {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancel: () => void;
  newImg: File | undefined;
}
const Avatar = ({ setEdit, handleCancel, newImg }: Props) => {
  const { setProfile } = useContext(isAuthContext);

  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  const editorRef = useRef<AvatarEditor | null>(null);

  interface positionInterface {
    x: number;
    y: number;
  }

  const handlePositionChange = (position: positionInterface) => {
    setPosition(position);
  };

  const handleUpdateImage = async () => {
    const userId = Cookies.get("user-id");
    const { accessToken } = await generateNewToken();

    // Convert data URL to Blob
    const canvas = editorRef.current!.getImageScaledToCanvas();
    const dataURL = canvas.toDataURL("image/jpeg");
    const blob = await fetch(dataURL).then((res) => res.blob());
    const file = new File(
      [blob],
      `${Date.now()}-${Math.random().toString(16)}-${newImg!.name}`,
      { type: "image/jpeg" }
    );
    const formData = new FormData();
    formData.append("image", file as File);
    return await axios.patch(updateUserImageRoute(userId as string), formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  function handleSaveButtonClick() {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImage = canvas.toDataURL();
      setEdit(false);
      handleUpdateImage();
      setProfile(croppedImage as string);
    }
  }

  const [scale, setScale] = useState(0);
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value));
  };

  return (
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
  );
};

export default Avatar;
