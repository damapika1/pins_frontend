/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRegister, useSession } from "../contexts/AuthProvider";

import {
  Button,
  Flex,
  Heading,
  Stack,
  Image,AlertTitle,
  Text, Link, FormControl,
  FormLabel,AlertDescription,
  Input,Alert,AlertIcon,
  FormErrorMessage
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export default function Register () {
  const { t } = useTranslation("pages", { keyPrefix: "register" });
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t("input-error.name.minLength"))
      .max(50, t("input-error.name.maxLength"))
      .required(t("input-error.name.required")),
    password: Yup.string()
      .min(8, t("input-error.password.minLength"))
      .required(t("input-error.password.required")),
    email: Yup.string().email(t("input-error.email.incorrect")).required(t("input-error.email.required")),
    confirmPassword: Yup.string()
      .min(8, t("input-error.confirmPassword.minLength"))
      .required(t("input-error.confirmPassword.required"))
      .oneOf([Yup.ref("password"), null], t("input-error.confirmPassword.match"))

  });
  const history = useNavigate();

  const { loading, error, isAuthed } = useSession();
  const register = useRegister();

  useEffect(()=>{
    if(isAuthed){
      history("/");
    }
  },[history,isAuthed]);

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          {error?<Alert
            status='warning'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
          >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
              {t("warning.title")}
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
              {t("warning.info")}
            </AlertDescription>
          </Alert>:null}
          <Heading fontSize={"2xl"}>{t("title")}</Heading>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: ""
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              await register(values);
            }}
          >
            <Form>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl isRequired isInvalid ={!error && form.errors.name && form.touched.name} >
                    <FormLabel>{t("input.name")}</FormLabel>
                    <Input placeholder="name" data-cy="name_input" id ="name" {...field} />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl isRequired isInvalid ={!error && form.errors.email && form.touched.email} >
                    <FormLabel>{t("input.email")}</FormLabel>
                    <Input placeholder="your@email.com" data-cy="email_input" id ="email" type="email" {...field}/>
                    {form.errors.email && form.touched.email
                      ? (<FormErrorMessage>{form.errors.email}</FormErrorMessage>)
                      : null}
                  </FormControl>
                )}
              </Field>

              <Field name="password" >
                {({ field, form }) => (
                  <FormControl isRequired isInvalid ={!error && form.errors.password && form.touched.password} >
                    <FormLabel>{t("input.password")}</FormLabel>
                    <Input data-cy="password_input" id="password" type="password"{...field} />
                    {form.errors.password && form.touched.password
                      ? (<FormErrorMessage>{form.errors.password}</FormErrorMessage>)
                      : null}
                  </FormControl>
                )}
              </Field>
              <Field name="confirmPassword" >
                {({ field, form }) => (
                  <FormControl isRequired isInvalid ={!error && form.errors.confirmPassword && form.touched.confirmPassword}>
                    <FormLabel>{t("input.confirmPassword")}</FormLabel>
                    <Input data-cy="confirmPassword_input" id="confirmPassword" type="password" {...field}/>
                    {form.errors.confirmPassword && form.touched.confirmPassword
                      ? (<FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>)
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
                <Button data-cy="register_btn"type="submit" colorScheme={"blue"} variant={"solid"} isLoading={loading}>
                  {t("button.signup")}
                </Button>
              </Stack>
            </Form>
          </Formik>
          <Stack pt={6}>
            <Text align={"center"}>
              {t("extra")} <Link as={NavLink} to="/login" color={"blue.400"}>{t("login")}</Link>
            </Text>
          </Stack>
        </Stack>

      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
