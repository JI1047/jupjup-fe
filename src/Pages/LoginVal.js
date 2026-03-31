import React, { useEffect, useState } from 'react';

function LoginVal() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("👉 저장된 JWT:", token);

        const response = await fetch('http://localhost:8080/api/auth/login-success', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        if (!response.ok) throw new Error('로그인 정보 조회 실패');

        const data = await response.json();
        console.log("✅ 응답 받은 사용자 정보:", data);
        setUserData(data);
      } catch (error) {
        console.error('에러:', error);
        alert('사용자 정보를 불러오는 데 실패했습니다.');
      }
    };

    fetchUserInfo();
  }, []);

  if (!userData) return <p>로딩 중...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>로그인 성공 🎉</h2>
      <p><strong>이름:</strong> {userData.name}</p>
      <p><strong>전화번호:</strong> {userData.phone}</p>
      <p><strong>성별:</strong> {userData.gender}</p>
      <p><strong>생년월일:</strong> {userData.birth}</p>
      <p><strong>주소:</strong> {userData.address}</p>
    </div>
  );
}

export default LoginVal;