import React,{useRef} from "react";
import {AlertDialog,Button,AlertDialogOverlay,AlertDialogHeader ,AlertDialogContent,AlertDialogCloseButton,AlertDialogBody,AlertDialogFooter}from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
export default function AlertDialogDefault(props) {
  const {action,translation,popupControl,onConfirm,data_no,data_yes}=props;
  const{isOpen,onClose}=popupControl;
  const { t } = useTranslation(translation,{ keyPrefix: `${action}.popup`});
  const cancelRef = useRef();

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>{t("header")}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {t("body")}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button data-cy={data_no} ref={cancelRef} onClick={onClose}>
              {t("no")}
            </Button>
            <Button data-cy={data_yes} colorScheme='blue' ml={3} onClick={() => {
              onConfirm();
              onClose();
            }}>
              {t("yes")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

