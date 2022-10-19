import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import * as pinApi from "../api/pins";
import useDefaultToast from "../hooks/useDefaultToast";
import { useSession } from "./AuthProvider";

const PinsContext = createContext();
export const usePins = () => useContext(PinsContext);

export const PinsProvider = ({ children }) => {
  const {showToast}=useDefaultToast();
  const [initialLoad, setInitialLoad] = useState(false);
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPin, setCurrentPin] = useState({});
  const { ready: authReady } = useSession();

  const refreshPins = useCallback(async () => {
    // will fetch pin data
    try {
      setError("");
      setLoading(true);
      const data = await pinApi.getAllPins();
      setPins(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const setPinToUpdate = useCallback(
    (id) => {
      setCurrentPin(id === null ? {} : pins.find((p) => p.id === id));
    },
    [pins],
  );

  useEffect(() => {
    if (authReady && !initialLoad) {
      refreshPins();
      setInitialLoad(true);
    }
  }, [initialLoad, refreshPins, authReady]);

  const createOrUpdatePin = useCallback(async ({ id, title, date, fav, description,userId }) => {
    const createOrEdit =id?"update":"create";
    try {
      setError("");
      setLoading(true);
      await pinApi.savePin({ id, title, date, fav, description, userId});
      await refreshPins();
      showToast("pins:"+createOrEdit+".success","success");
    } catch (error) {
      setError(error);
      showToast("pins:"+createOrEdit+".warning","warning");
      console.log(error);
    } finally {
      setLoading(false);
    }
  },
  [refreshPins],
  );

  const deletePin = useCallback(
    async (id) => {
      try {
        setError("");
        setLoading(true);
        await pinApi.deletePin(id);
        refreshPins();
        showToast("pins:delete.success","success");
      } catch (error) {
        showToast("pins:delete.warning","warning");
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [refreshPins],
  );

  const value = useMemo(
    () => ({
      pins,
      error,
      loading,
      createOrUpdatePin,
      deletePin,
      currentPin,
      setPinToUpdate,
    }),
    [
      pins,
      error,
      loading,
      createOrUpdatePin,
      deletePin,
      currentPin,
      setPinToUpdate,
    ],
  );

  return (
    <PinsContext.Provider value={value}>{children}</PinsContext.Provider>
  );
};
