import React,{useEffect,useState,useCallback} from "react";
import { useTranslation } from "react-i18next";
import {Input,Textarea ,FormControl,FormErrorMessage,FormLabel,Stack} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form, Field} from "formik";
import {  useNavigate,Navigate} from "react-router-dom";
import { useSession } from "../../contexts/AuthProvider";
import PopupBuilder from "../shared/PopupBuilder";
import { usePins } from "../../contexts/PinsProvider";

export default function AddPin(props) {
  AddPin.displayName = "Add or edit pin";

  const {pin,popupControl}=props;
  const {createOrUpdatePin} = usePins();
  const [pinState, setPin] = useState(pin);
  const { t } = useTranslation("pins",{ keyPrefix: pin?.id?"update":"create"});
  const {user,isAuthed, error} = useSession();
  const navigate = useNavigate();

  const EditSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, t("input-error.title.minLength"))
      .max(50, t("input-error.title.maxLength"))
      .required(t("input-error.title.required")),
    description: Yup.string()
      .max(255, t("input-error.description.maxLength"))
  });

  const handleSubmit= useCallback(async(values)=>{
    console.log(values);
    const date = new Date();
    const data ={id:values.id,title:values.title,
      description:values.description,fav:values.fav,date,userId:values.userId};
    try{
      await createOrUpdatePin({...data});
      navigate("/pins",{replace:true});
    }
    catch(error){
      console.log("Error while trying to update an existing pin", { error });
    }
  },[]);

  useEffect(() => {
    setPin(pin);
  }, [pin]);

  useEffect(() => {
    if(!isAuthed)
      navigate("/login",{replace:true});
  }, [isAuthed]);

  if (!isAuthed) {
    <Navigate to="/login" replace={true}/>;
  }
  return (
    <Formik initialValues={{
      id:pinState?.id,
      title: pinState?.title,
      description:pinState?.description,
      fav:Boolean(pinState?.fav),
      userId: user.id,
    }}
    validationSchema={EditSchema}
    >
      {({values}) => (
        <PopupBuilder
          popupControl={popupControl}
          onSubmit={()=>handleSubmit(values)}
          title={t("title")}
          no={t("button.no")}
          yes={t("button.yes")}
          data_no="cancel_btn"
          data_yes="submit_btn">
          <Form>
            <Field name="title">
              {({ field, form }) => (
                <FormControl isRequired isInvalid ={!error && form.errors.title && form.touched.title} >
                  <FormLabel>{t("input.title")}</FormLabel>
                  <Input data-cy="title_input" id ="title" type="title" {...field}/>
                  {form.errors.title && form.touched.title
                    ? (<FormErrorMessage data-cy="title_error_input">{form.errors.title}</FormErrorMessage>)
                    : null}
                </FormControl>
              )}
            </Field>
            <Field name="description">
              {({ field, form }) => (
                <FormControl isRequired isInvalid ={!error && form.errors.description && form.touched.description} >
                  <FormLabel>{t("input.description")}</FormLabel>
                  <Textarea data-cy="description_text" id ="description" type="description" {...field}/>
                  {form.errors.description && form.touched.description
                    ? (<FormErrorMessage data-cy="desc_error_text">{form.errors.description}</FormErrorMessage>)
                    : null}
                </FormControl>
              )}
            </Field>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}>
              </Stack>
            </Stack>
          </Form>
        </PopupBuilder>
      )}
    </Formik>
  );
}

