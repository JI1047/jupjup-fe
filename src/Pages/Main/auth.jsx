import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import "../../Components/MyPage/MypageHeader.js";
import "../../Styles/Main/Admin.css";

export default function Admin() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(180);

  const [formData, setFormData] = useState({
    userId: "",
    locationId: "",
    itemId: "",
    quantity: "",
  });

  const [qrImage, setQrImage] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false); // â­?NEW
  const token = localStorage.getItem("accessToken");

  // ?”¥ ???…ë ¥ ì²˜ë¦¬
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ?”¥ QR ?ì„± API ?¸ì¶œ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/recycle-history/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemId: Number(formData.itemId),
          quantity: Number(formData.quantity),
          collectionPointId: Number(formData.locationId),
          intendedUserId: Number(formData.userId),
        }),
      });

      if (!res.ok) throw new Error(`?œë²„ ?‘ë‹µ ?¤ë¥˜: ${res.status}`);

      const data = await res.json();
      setResponseData(data);

      const qr = await QRCode.toDataURL(data.qrUrl, { width: 240, margin: 2 });
      setQrImage(qr);

      setShowModal(true); // â­?ëª¨ë‹¬ ?´ê¸°

    } catch (err) {
      alert(`?ëŸ¬: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  let timer;

  if (showModal) {
    setCountdown(180); // ëª¨ë‹¬ ?´ë¦´ ???€?´ë¨¸ ì´ˆê¸°??
    timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowModal(false); // ?ë™?¼ë¡œ ?«ê¸°
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // 1ì´ˆë§ˆ???¤í–‰
  }

  return () => clearInterval(timer);
}, [showModal]);


  return (
    <div>
      <div className="My-Header">
        <button className="home-back-button" onClick={() => navigate("/adminlogin")}>
          logout
        </button>
      </div>

      <div className="admin-container">
        <h2 className="admin-title">QR ë°œê¸‰</h2>
        <p className="admin-sub">?¬ë°”ë¥??¬ìš©???•ë³´ë¥??…ë ¥?´ì£¼?¸ìš”.</p>

        {/* ?…ë ¥ ??*/}
        <form className="admin-form" onSubmit={handleSubmit}>

          <label className="admin-label">?¬ìš©??ID</label>
          <input
            type="text"
            name="userId"
            className="admin-input"
            value={formData.userId}
            onChange={handleChange}
          />

          <label className="admin-label">ê±°ì  ID</label>
          <input
            type="text"
            name="locationId"
            className="admin-input"
            value={formData.locationId}
            onChange={handleChange}
          />

          <label className="admin-label">?¬í™œ???ˆëª©</label>
          <select
            name="itemId"
            className="admin-select"
            value={formData.itemId}
            onChange={handleChange}
          >
            <option value="">-- ? íƒ --</option>
            <option value={1}>?¬ëª…?˜íŠ¸ë³?/option>
            <option value={2}>?Œë¼?¤í‹±</option>
            <option value={3}>?Œë£¨ë¯¸ëŠ„ ìº?/option>
            <option value={4}>ì²?ìº?/option>
            <option value={5}>ë¹„ë‹</option>
            <option value={6}>ì¢…ì´??/option>
            <option value={7}>? ë¬¸</option>
            <option value={8}>?˜ë¥˜</option>
            <option value={9}>?Œì£¼ë³?/option>
            <option value={10}>ë§¥ì£¼ë³?/option>
            <option value={11}>ê¸°í?ë³?/option>
          </select>

          <label className="admin-label">?˜ëŸ‰</label>
          <input
            type="number"
            name="quantity"
            className="admin-input"
            value={formData.quantity}
            onChange={handleChange}
          />

          <button type="submit" className="admin-submit-button" disabled={loading}>
            {loading ? "?ì„± ì¤?.." : "QR ?ì„±"}
          </button>
        </form>
      </div>

      {/* â­?NEW : QR ?ì„± ëª¨ë‹¬ */}
      {showModal && responseData && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">QRì½”ë“œ</h3>
            <p className="modal-guide">?„ë˜ QR???¸ì‹?˜ë©´ ?¬ì¸?¸ê? ?ë™?¼ë¡œ ?ë¦½?©ë‹ˆ?? </p>

            <p className="modal-text"><strong>Claim ID:</strong> {responseData.claimId}</p>
            <p className="modal-text"><strong>ë§Œë£Œ ?œê°:</strong> {responseData.expiresAt}</p>
            <p className="modal-text"><strong>URL:</strong> {responseData.qrUrl}</p>

             <p className="modal-timer">
              ?¨ì? ?œê°„: {Math.floor(countdown / 60)}ë¶?{countdown % 60}ì´?</p>

            {qrImage && (
              <div className="modal-qr">
                <img src={qrImage} alt="QR" width="300" />
              </div>
            )}

          <button 
                  className="modal-close-btn" 
                  onClick={() => setShowModal(false)}
                >
                  ?«ê¸°
                </button>
          
            
          </div>
        </div>
      )}

    </div>
  );
}
