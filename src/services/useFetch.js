import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchData = async () => {
    try {
      setLoading(true);
      const {data : responseData} = await axios.get(url);
      setResponse(responseData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    response,
    loading,
    error,
  };
};

export default useFetch;
