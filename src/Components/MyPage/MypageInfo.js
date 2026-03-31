import "../../Styles/Mypage/MypageInfo.css";
import Header from "./MPsectionHeader.js";
import { Link  } from "react-router-dom";
import { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";


export default function MypageInformation() {

  const { state } = useLocation();
    const navigate = useNavigate();

    const [form, setForm] = useState({
      id: "", name: "", phone: "", gender: "", birth: "", address: "", type: ""
    });
    const [pw, setPw] = useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // 1) stateë¡?ë°›ì? ?°ì´???°ì„  ?¬ìš©
      if (state?.userData) {
        const d = state.userData;
        setForm({
          id: d.id ?? "", name: d.name ?? "", phone: d.phone ?? "",
          gender: d.gender ?? "", birth: d.birth ?? "", address: d.address ?? "",
          type: d.type ?? ""
        });
        setLoading(false);
        return;
      }

      // 2) ?ˆë¡œê³ ì¹¨ ??state ? ì‹¤ ???´ë°±
      const fetchLatest = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            alert("ë¡œê·¸?????´ìš©?´ì£¼?¸ìš”.");
            navigate("/oauth/loginInfo");
            return;
          }
          const res = await fetch("/api/auth/me", {
            headers: { Authorization: "Bearer " + token }
          });
          if (!res.ok) throw new Error("???•ë³´ ì¡°íšŒ ?¤íŒ¨");
          const d = await res.json();
          if (d.type !== "LOCAL") {
            navigate("/edit-profile-social", { state: { userData: d } });
            return;
          }
          setForm({
            id: d.id ?? "", name: d.name ?? "", phone: d.phone ?? "",
            gender: d.gender ?? "", birth: d.birth ?? "", address: d.address ?? "",
            type: d.type ?? ""
          });
        } catch (e) {
          console.error(e);
          alert("???•ë³´ë¥?ë¶ˆëŸ¬?¤ì? ëª»í–ˆ?µë‹ˆ??");
        } finally {
          setLoading(false);
        }
      };

      fetchLatest();
    }, [state, navigate]);

    // ???€???´ë²¤??(PUT /api/auth/edit)
    const handleSubmit = async (e) => {
      e.preventDefault();

      const wantsPwChange = pw.currentPassword || pw.newPassword || pw.confirmPassword;
      if (wantsPwChange) {
        if (!pw.newPassword) return alert("??ë¹„ë?ë²ˆí˜¸ë¥??…ë ¥?˜ì„¸??");
        if (pw.newPassword !== pw.confirmPassword) return alert("??ë¹„ë?ë²ˆí˜¸ ?•ì¸???¼ì¹˜?˜ì? ?ŠìŠµ?ˆë‹¤.");
      }

      const token = localStorage.getItem("accessToken");
      try {
        const res = await fetch("/api/auth/edit", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            gender: form.gender,
            birth: form.birth,
            address: form.address,
            currentPassword: wantsPwChange ? pw.currentPassword : null,
            newPassword: wantsPwChange ? pw.newPassword : null,
            loginType: form.type
          })
        });
        if (!res.ok) throw new Error("?˜ì • ?¤íŒ¨");
        alert("?˜ì • ?„ë£Œ!");
        navigate("/mypage");
      } catch (e) {
        console.error(e);
        alert("?˜ì •???¤íŒ¨?ˆìŠµ?ˆë‹¤.");
      }
    };

    if (loading) return <p>ë¡œë”© ì¤?..</p>;

    return (
       <div className="My-Information">
       <Header />

       <div className="Information-Body">
       <div className="Information-form">
    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="text"
        value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
      
    </div>

    <p className="Information-message-text">  </p>

  

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="text"
        placeholder="?„í™”ë²ˆí˜¸"
         value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
    </div>

    <div className="Information-input-wrapper">
      <select className="Information-input"
         value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
        <option value="MALE">?¨ì</option>
        <option value="FEMALE">?¬ì</option>
      </select>
    </div>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="text"
         value={form.birth}
            onChange={(e) => setForm({ ...form, birth: e.target.value })}
            placeholder="YYYY-MM-DD"
      />
    </div>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="text"
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
    </div>

      <div className="password-box">
      <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="password"
        placeholder="?„ì¬ ë¹„ë?ë²ˆí˜¸"
        value={pw.currentPassword}
        onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })}
      />
    </div>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="password"
        placeholder="??ë¹„ë?ë²ˆí˜¸ (8???´ìƒ)"
         value={pw.newPassword}
        onChange={(e) => setPw({ ...pw, newPassword: e.target.value })}
      />
        </div>

         <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="password"
        placeholder="??ë¹„ë?ë²ˆí˜¸ ?•ì¸"
         value={pw.confirmPassword}
            onChange={(e) => setPw({ ...pw, confirmPassword: e.target.value })}
      />
        </div>

    </div>

   
    <button className="Information-submit-button">?•ë³´ ?€??/button>
  </div>
</div>
</div>
  );
};



{/*const MypageInformation = () => {
  return (
    <div className="My-Information">
       <Header />
       
       <div className="Information-Body">
       <div className="Information-form">
    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="text"
        placeholder="ID"
      />
      
    </div>

    <p className="Information-message-text">  </p>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="password"
        placeholder="Password : ex) ?ë¬¸, ?«ì, ?¹ìˆ˜ë¬¸ì ?¬í•¨ 8???´ìƒ"
      />
    </div>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="password"
        placeholder="Password ?•ì¸"
      />
    </div>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="text"
        placeholder="?´ë¦„"
      />
    </div>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="text"
        placeholder="?„í™”ë²ˆí˜¸"
      />
    </div>

    <div className="Information-input-wrapper">
      <select className="Information-input">
        <option value="MALE">?¨ì</option>
        <option value="FEMALE">?¬ì</option>
      </select>
    </div>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="text"
        placeholder="?ë…„?”ì¼ (YYYY-MM-DD)"
      />
    </div>

    <div className="Information-input-wrapper">
      <input
        className="Information-input"
        type="text"
        placeholder="Address"
      />
    </div>
      <Link to="/Mypage">
    <button className="Information-submit-button">?•ë³´ ?€??/button></Link>
  </div>
</div>
</div>
  );
};

export default MypageInformation;*/}
