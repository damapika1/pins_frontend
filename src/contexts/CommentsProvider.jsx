
import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext
} from "react";
import * as commentApi from "../api/comments";
import { useSession } from "./AuthProvider";
import useDefaultToast from "../hooks/useDefaultToast";

const CommentsContext = createContext();
export const useComments = () => useContext(CommentsContext);

export const CommentsProvider = ({ children }) => {
  const {showToast}=useDefaultToast();
  const [initialLoad, setInitialLoad] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentComment, setCurrentComment] = useState({});
  const { ready: authReady } = useSession();

  const refreshComments= useCallback(async () => {
    // will fetch pin data
    try {
      setError("");
      setLoading(true);
      const data = await commentApi.getAllComments();
      setComments(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const setCommentToUpdate = useCallback(
    (id) => {
      setCurrentComment(id === null ? {} : comments.find((p) => p.id === id));
    },
    [comments]
  );

  useEffect(() => {
    if (authReady && !initialLoad) {
      refreshComments();
      setInitialLoad(true);
    }
  }, [initialLoad, refreshComments, authReady]);

  const createOrUpdateComment = useCallback(
    async ({ id, comment, date, pinId }) => {
      const createOrEdit =id?"update":"create";
      try {
        setError("");
        setLoading(true);
        await commentApi.saveComment({ id, comment, date, pinId});
        await refreshComments();
        showToast("comments:"+createOrEdit+".success","success");
      } catch (error) {
        setError(error);
        showToast("comments:"+createOrEdit+".warning","warning");
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [refreshComments]
  );

  const deleteComment = useCallback(
    async (id) => {
      try {
        setError("");
        setLoading(true);
        await commentApi.deleteComment(id);
        refreshComments();
        showToast("comments:delete.success","success");
      } catch (error) {
        showToast("comments:delete.warning","warning");
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [refreshComments]
  );

  const value = useMemo(
    () => ({
      comments,
      error,
      loading,
      createOrUpdateComment,
      deleteComment,
      currentComment,
      setCommentToUpdate
    }),
    [
      comments,
      error,
      loading,
      createOrUpdateComment,
      deleteComment,
      currentComment,
      setCommentToUpdate
    ]
  );

  return (
    <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>
  );
};
