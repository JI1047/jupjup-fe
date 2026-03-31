import React, { useEffect, useState } from 'react';

function LoginVal() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("?‘‰ ?€?¥ëœ JWT:", token);

        const response = await fetch('/api/auth/login-success', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        if (!response.ok) throw new Error('ë¡œê·¸???•ë³´ ì¡°íšŒ ?¤íŒ¨');

        const data = await response.json();
        console.log("???‘ë‹µ ë°›ì? ?¬ìš©???•ë³´:", data);
        setUserData(data);
      } catch (error) {
        console.error('?ëŸ¬:', error);
        alert('?¬ìš©???•ë³´ë¥?ë¶ˆëŸ¬?¤ëŠ” ???¤íŒ¨?ˆìŠµ?ˆë‹¤.');
      }
    };

    fetchUserInfo();
  }, []);

  if (!userData) return <p>ë¡œë”© ì¤?..</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>ë¡œê·¸???±ê³µ ?‰</h2>
      <p><strong>?´ë¦„:</strong> {userData.name}</p>
      <p><strong>?„í™”ë²ˆí˜¸:</strong> {userData.phone}</p>
      <p><strong>?±ë³„:</strong> {userData.gender}</p>
      <p><strong>?ë…„?”ì¼:</strong> {userData.birth}</p>
      <p><strong>ì£¼ì†Œ:</strong> {userData.address}</p>
    </div>
  );
}

export default LoginVal;
