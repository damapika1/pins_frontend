import axios from "axios";
import {
  useState,
  useEffect,
  useCallback,
} from "react";
export function useFetch (uri) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const fetchData = useCallback(async (uri) => { // will fetch note data
    try {
      setError();
      setLoading(true);
      const {
        data,
      } = await axios.get(uri);
      setData(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);

  useEffect(() => {
    fetchData(uri);
  }, [uri, fetchData]);

  return {
    loading,
    data,
    error,
  };
}
