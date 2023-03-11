import React, { useState } from "react";

const usePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: React.MouseEvent) => {
    setShowPassword(!showPassword);
  };
  return [showPassword, handleShowPassword] as const;
};

export default usePassword;
