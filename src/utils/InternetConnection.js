import { WifiIcon } from "@heroicons/react/24/outline";
import {useState, useEffect} from "react";

function InternetConnection() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleStatusChange);

    window.addEventListener("offline", handleStatusChange);

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);
  return (
    <div className="">
      {!isOnline && (
        <span className="text-white bg-red-500 flex justify-center">
        <WifiIcon/> 
          <span className="ml-2"> Ağ Hatası</span>
        </span>
      )}
    </div>
  );
}

export default InternetConnection;
