import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import NavRoutes from "../../widget/routes";
import { AnimatePresence, motion } from "framer-motion";
import { isAuthContext } from "../../context/isAuthcontext";
import ProfileImg from "../../widget/ProfileImg";
import UserDropDown from "../../pages/user/UserDropDown";
import Logo from "./Logo";
import Notifications from "./Notifications/Notifications";

const Nav: React.FC = () => {
  const authData = useContext(isAuthContext);
  const {
    isAuth,
    profile,
    userDetails: { username },
  } = authData;

  const [showDropDown, setShowDropDown] = useState(false);
  const imgFn = () => {
    if (!showDropDown) {
      setShowDropDown(true);
    }
  };
  return (
    <>
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div id="logo">
          <Logo />
        </div>
        <div id="login-state">
          {isAuth ? (
            <>
              {!profile ? (
                <div className="skeleton nav-img"> </div>
              ) : (
                <>
                  <ProfileImg
                    height={30}
                    title={`${username}s profile`}
                    fn={imgFn}
                  />
                </>
              )}
              <AnimatePresence mode="wait">
                {showDropDown && (
                  <>
                    <UserDropDown
                      setShowDropDown={setShowDropDown}
                      showDropDown={showDropDown}
                    />
                  </>
                )}
              </AnimatePresence>
            </>
          ) : (
            <>
              <Link className="login-link" to="/login">
                log in
              </Link>
            </>
          )}
          <Notifications />
        </div>
      </motion.nav>

      <NavRoutes />
    </>
  );
};

export default Nav;
