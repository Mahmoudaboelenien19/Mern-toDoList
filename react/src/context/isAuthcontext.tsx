import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getUserRoute } from "../../routes";
import { useAppDispatch } from "../customHooks/reduxTypes";
import {
  addtoNotificationArr,
  notificationCounter,
} from "../redux/NotificationSlice";

export const isAuthContext = createContext({} as isAuthContext);

interface Props {
  children: React.ReactNode;
}

interface imageInterface {
  imageName: string;
  imagePath: string;
}

interface isAuthContext {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDataUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  isDataUpdated: boolean;
  userDetails: {
    phone: string;
    password: string;
    country: string;
    gender: string;
    email: string;
    username: string;
    image: imageInterface;
    count: number;
  };
}

const IsAuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [userDetails, setUserDetails] = useState({
    phone: "",
    password: "",
    country: "",
    gender: "",
    email: "",
    username: "",
    image: {} as imageInterface,
    notification: [],
    count: 0,
  });

  const getUserData = async (userId: string) => {
    if (userId) {
      return await axios
        .get(getUserRoute(userId as string))
        .then(({ data }) => {
          dispatch(addtoNotificationArr(data.user.notification?.reverse()));
          dispatch(notificationCounter(data.user.count));
          setUserDetails({
            ...userDetails,
            phone: data.user.phone,
            country: data.user.country,
            gender: data.user.gender,
            email: data.user.email,
            username: data.user.username,
            image: data.user.image,
            count: data.user.count,
          });
        });
    }
  };

  useEffect(() => {
    const user = Cookies.get("user-id");
    console.log({ user });
    if (user) {
      setIsAuth(true);
      getUserData(user);
    } else {
      setIsAuth(false);
    }
  }, [isAuth, isDataUpdated]);

  useEffect(() => {
    if (!isDataUpdated) return;
    setIsDataUpdated(false);
  }, [isDataUpdated]);
  return (
    <isAuthContext.Provider
      value={{
        setIsAuth,
        isAuth,
        userDetails,
        setIsDataUpdated,
        isDataUpdated,
      }}
    >
      {children}
    </isAuthContext.Provider>
  );
};
export default IsAuthProvider;
