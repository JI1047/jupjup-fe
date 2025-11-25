import "../Styles/Start/introduse.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";


function Introduse() {
  

  return (
    <div className="introduse-container">
      <img 
        src="/images/introduse1.png" 
        alt="intro" 
        className="introduse-full"
      />
    </div>
  );
};

export default Introduse;