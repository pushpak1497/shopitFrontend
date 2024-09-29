import React, { useState } from "react";
import { Link } from "react-router-dom";
function SideBarMenu({ menuItems }) {
  //   const location = useLocation();

  const [isActiveMenu, setIsActiveMenu] = useState(window.location.pathname);
  const handleMenuClick = (url) => {
    setIsActiveMenu(url);
  };
  return (
    <div className="list-group mt-5 pl-4">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.url}
          className={`fw-bold list-group-item list-group-item-action ${
            isActiveMenu.includes(item.url) ? "active" : ""
          }`}
          aria-current={isActiveMenu.includes(item.url) ? "true" : "false"}
          onClick={() => handleMenuClick(item.url)}
        >
          <i className={`menu-item-icon-1 ${item.icon} pe-2`}></i>
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default SideBarMenu;
