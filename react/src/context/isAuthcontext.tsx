import { createContext, useState, useEffect } from "react";
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
interface isAuthContext {
  isAuth: boolean;
  srcImg: any;
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
    image: { metadata: Record<string, any> };
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
    image: {} as { metadata: Record<string, any> },
    notification: [],
    count: 0,
  });

  const getUserData = async (userId: string) => {
    if (userId) {
      return await axios.get(getUserRoute(userId!)).then(({ data }) => {
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
  console.log({ isAuth });

  const [srcImg, setImg] = useState<File | undefined>();
  useEffect(() => {
    if ((userDetails.image as any)?.fileId) {
      const imgId = (userDetails.image as any).fileId;
      console.log({ imgId });
      fetch(`http://localhost:3000/file/${imgId}`)
        .then((response) => response.blob())
        .then((data) => {
          if (data) {
            setImg(URL.createObjectURL(data as any) as any);
          }
        });
    }
  }, [userDetails.image]);

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
        srcImg,
        setIsDataUpdated,
        isDataUpdated,
      }}
    >
      {children}
    </isAuthContext.Provider>
  );
};
export default IsAuthProvider;
