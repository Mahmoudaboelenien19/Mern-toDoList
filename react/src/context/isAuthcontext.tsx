import { createContext, useState, useEffect } from "react";
import { useAppSelector } from "../customHooks/reduxTypes";
import Cookies from "js-cookie";
import axios from "axios";
import { getUserRoute } from "../../routes";

export const isAuthContext = createContext({} as isAuthContext);

interface Props {
  children: React.ReactNode;
}
interface isAuthContext {
  isAuth: boolean;
  srcImg: any;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: {
    phone: string;
    password: string;
    country: string;
    gender: string;
    email: string;
    username: string;
    image: { metadata: Record<string, any> };
  };
}

const IsAuthProvider = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userDetails, setUserDetails] = useState({
    phone: "",
    password: "",
    country: "",
    gender: "",
    email: "",
    username: "",
    image: {} as { metadata: Record<string, any> },
  });
  const getUserData = async (userId: string) => {
    if (userId) {
      return await axios.get(getUserRoute(userId!)).then(({ data }) => {
        console.log(data);
        setUserDetails({
          ...userDetails,
          phone: data.user.phone,
          country: data.user.country,
          gender: data.user.gender,
          email: data.user.email,
          username: data.user.username,
          image: data.user.image,
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
    if (user) {
      setIsAuth(true);
      getUserData(user);
      console.log("useeffect true runs");
    } else {
      setIsAuth(false);
    }
  }, [isAuth]);

  return (
    <isAuthContext.Provider value={{ setIsAuth, isAuth, userDetails, srcImg }}>
      {children}
    </isAuthContext.Provider>
  );
};
export default IsAuthProvider;
