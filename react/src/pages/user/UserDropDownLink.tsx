import React from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  link: string;
  Icon: React.ComponentType;
  fn?: () => void;
}
const UserDropDownLink = ({ to, Icon, fn, link }: Props) => {
  return (
    <li onClick={fn}>
      <Link to={to}>
        {" "}
        <span className="nav-icon">
          <Icon />
        </span>
        <span className="user-link" style={{ alignSelf: "center" }}>
          {link}
        </span>
      </Link>
    </li>
  );
};

export default UserDropDownLink;
