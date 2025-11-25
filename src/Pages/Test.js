import { useNavigate } from 'react-router-dom';
import "../Styles/Test/Test.css";
import Start from "./Start";
import Introduse from "./introduse";
import IntroduseSE from "./introduseSE";
import IntroduseTH from "./introduseTH";
import "../Styles/Test/Test.css";
import { motion } from "framer-motion";

const fadeSlideDown = {
  initial: { opacity: -40, y: 0 },   // 위에서 내려오는 느낌
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};


const Test = () => {
  return (
    <div className="scroll-container">
     <motion.section className="scroll-page" {...fadeSlideDown} viewport={{ once: true }}>
        <Start />
      </motion.section>

      <motion.section className="scroll-page" {...fadeSlideDown} viewport={{ once: true }}>
        <Introduse />
      </motion.section>

      <motion.section className="scroll-page" {...fadeSlideDown} viewport={{ once: true }}>
        <IntroduseSE />
      </motion.section>

      <motion.section className="scroll-page" {...fadeSlideDown} viewport={{ once: true }}>
        <IntroduseTH />
      </motion.section>
    </div>
  );
};

export default Test;