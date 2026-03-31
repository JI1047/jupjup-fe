import "../../Styles/Mypage/MypageInfo.css";
import Header from "./MPsectionHeader.js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function MypageInformation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    name: "",
    phone: "",
    gender: "",
    birth: "",
    address: "",
    type: "",
  });
  const [pw, setPw] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state?.userData) {
      const d = state.userData;
      setForm({
        id: d.id ?? "",
        name: d.name ?? "",
        phone: d.phone ?? "",
        gender: d.gender ?? "",
        birth: d.birth ?? "",
        address: d.address ?? "",
        type: d.type ?? "",
      });
      setLoading(false);
      return;
    }

    const fetchLatest = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          alert("로그인이 필요합니다.");
          navigate("/oauth/loginInfo");
          return;
        }

        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("사용자 정보 조회 실패");

        const d = await res.json();
        if (d.type !== "LOCAL") {
          navigate("/edit-profile-social", { state: { userData: d } });
          return;
        }

        setForm({
          id: d.id ?? "",
          name: d.name ?? "",
          phone: d.phone ?? "",
          gender: d.gender ?? "",
          birth: d.birth ?? "",
          address: d.address ?? "",
          type: d.type ?? "",
        });
      } catch (e) {
        console.error(e);
        alert("사용자 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, [state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const wantsPwChange = pw.currentPassword || pw.newPassword || pw.confirmPassword;
    if (wantsPwChange) {
      if (!pw.newPassword) return alert("새 비밀번호를 입력하세요.");
      if (pw.newPassword !== pw.confirmPassword) {
        return alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      }
    }

    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch("/api/auth/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          gender: form.gender,
          birth: form.birth,
          address: form.address,
          currentPassword: wantsPwChange ? pw.currentPassword : null,
          newPassword: wantsPwChange ? pw.newPassword : null,
          loginType: form.type,
        }),
      });

      if (!res.ok) throw new Error("수정 실패");
      alert("수정 완료!");
      navigate("/mypage");
    } catch (e) {
      console.error(e);
      alert("수정에 실패했습니다.");
    }
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="My-Information">
      <Header />

      <div className="Information-Body">
        <form className="Information-form" onSubmit={handleSubmit}>
          <div className="Information-input-wrapper">
            <input
              className="Information-input"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="이름"
            />
          </div>

          <p className="Information-message-text"> </p>

          <div className="Information-input-wrapper">
            <input
              className="Information-input"
              type="text"
              placeholder="전화번호"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="Information-input-wrapper">
            <select
              className="Information-input"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="MALE">남자</option>
              <option value="FEMALE">여자</option>
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
                placeholder="현재 비밀번호"
                value={pw.currentPassword}
                onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })}
              />
            </div>

            <div className="Information-input-wrapper">
              <input
                className="Information-input"
                type="password"
                placeholder="새 비밀번호 (8자 이상)"
                value={pw.newPassword}
                onChange={(e) => setPw({ ...pw, newPassword: e.target.value })}
              />
            </div>

            <div className="Information-input-wrapper">
              <input
                className="Information-input"
                type="password"
                placeholder="새 비밀번호 확인"
                value={pw.confirmPassword}
                onChange={(e) => setPw({ ...pw, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="Information-submit-button">
            정보 수정
          </button>
        </form>
      </div>
    </div>
  );
}
