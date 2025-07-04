import "../../Styles/Mypage/MypageSidebar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MypageSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

    const navigate = useNavigate();

  return (
    <>
      <div className={`mypage-sidebar ${isOpen ? "open" : "closed"}`}>
        <ul className="sidebar-menu">
          <li>menu1</li>
          <li>menu2</li>
          <li>menu3</li>
          <li>menu4</li>
        </ul>
        <div className="sidebar-home-button">
        <button onClick={() => navigate("/Main")}>Home</button>
    </div>
    </div>
      <button className="sidebar-toggle-button" onClick={toggleSidebar}>
        {isOpen ? "◀" : "▶"}
      </button>
    </>
  );
};

export default MypageSidebar;