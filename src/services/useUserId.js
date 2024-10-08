import { useState } from "react";

export default function useUserId() {
  const getUserId = () => {
    const userId = localStorage.getItem("userId");
    return userId;
  };
  const [userId, setUserId] = useState(getUserId());

  const saveUserId = (userId) => {
    localStorage.setItem("userId", userId);
    setUserId(userId);
  };
  return {
    setUserId: saveUserId,
    userId,
  };
}
