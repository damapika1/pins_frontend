import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const useDefaultToast = () => {
  const { t } = useTranslation();
  const toast = useToast({
    isClosable: true,
    position: "bottom",
    duration: 2400,
  });

  const showToast = useCallback((message,status) => {
    toast({
      title:(t(message)),
      // description: t(message),
      duration: 2400,
      status:status,
      isClosable: true,
    });
  }, [toast, t]);
  return { showToast };
};

export default useDefaultToast;
