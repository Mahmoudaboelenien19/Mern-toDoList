import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useAppDispatch } from "../customHooks/reduxTypes";
import {
  addtoNotificationArr,
  notificationCounter,
} from "../redux/NotificationSlice";
import guestUser from "../assets/images/guest.png";
import { getAllTodos } from "../redux/Taskslice";

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
  userId: string;
  profile: string;
  setProfile: React.Dispatch<React.SetStateAction<string>>;
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
  const [profile, setProfile] = useState("");
  const [userId, setUserId] = useState("");
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
    console.log(userId);
    if (userId) {
      dispatch(getAllTodos());

      return await axios
        .get(`/api/user/getData/${userId}`)
        .then(({ data }) => {
          console.log(data);
          if (data.user?.notification?.length >= 1) {
            dispatch(addtoNotificationArr(data.user.notification?.reverse()));
            dispatch(notificationCounter(data.user.count));
          }
          setProfile(data.user?.image?.imagePath || guestUser);
          setUserDetails({
            ...userDetails,
            phone: data?.user?.phone,
            country: data?.user?.country,
            gender: data?.user?.gender,
            email: data?.user?.email,
            username: data?.user?.username,
            image: data?.user?.image,
            count: data?.user?.count,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const user = Cookies.get("user-id");
    if (user) {
      setIsAuth(true);
      setUserId(user);
      getUserData(user);
    } else {
      setIsAuth(false);
    }
  }, [isAuth]);

  return (
    <isAuthContext.Provider
      value={{
        setIsAuth,
        isAuth,
        userDetails,

        userId,
        profile,
        setProfile,
      }}
    >
      {children}
    </isAuthContext.Provider>
  );
};
export default IsAuthProvider;
