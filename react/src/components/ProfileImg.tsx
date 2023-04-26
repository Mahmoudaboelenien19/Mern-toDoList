import React, { useContext } from "react";
import { isAuthContext } from "../context/isAuthcontext";

interface Props {
  height: number;
  fn?: () => void;
  title?: string;
}

const ProfileImg = ({ height, title, fn }: Props) => {
  const { profile } = useContext(isAuthContext);
  return (
    <>
      <img
        onClick={fn}
        title={title}
        src={profile}
        alt={"profile"}
        style={{
          height,
          width: height,
          borderRadius: "50%",
          border: " 1px solid grey",
          margin: "0 10px",
        }}
      />
    </>
  );
};

export default ProfileImg;
