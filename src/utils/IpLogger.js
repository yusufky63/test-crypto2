/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import axios from "axios";
import { lastLoginIP } from "../services/Firebase/FirebaseProfile";
import { useSelector } from "react-redux";

function IpLogger() {
  const { user } = useSelector((state) => state.auth);

  const userAgent = window.navigator.userAgent;
  const isMobile = window.innerWidth <= 768;

  const fetchScan = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      if (response.status === 200) {
        const { ip } = response.data;
        if (user && ip) {
          lastLoginIP({
            uid: user.uid,
            user: user.email && user.email,
            ip: ip,
            date: new Date(),
            isMobile: isMobile,
            userAgent: userAgent,
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchScan();
  }, []);

  return null;
}

export default IpLogger;
