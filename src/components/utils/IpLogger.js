import {useEffect} from "react";
import axios from "axios";
import {lastLoginIP} from "../../services/firebase";
import {useSelector} from "react-redux";

function IpLogger() {
  const {user} = useSelector((state) => state.auth);
  const {lastLogin} = useSelector((state) => state.lastLogins);

  const userAgent = window.navigator.userAgent;
  const isMobile = window.innerWidth <= 768;

  const fetchScan = async () => {
    const {data} = await axios.get("https://api.ipify.org?format=json");
    console.log(lastLogin);
    if (user && data.ip) {
      lastLoginIP({
        uid: user.uid,
        user: user.email && user.email,
        ip: data.ip,
        date: new Date(),
        isMobile: isMobile,
        userAgent: userAgent,
      });
    }
  };

  useEffect(() => {
    fetchScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default IpLogger;
