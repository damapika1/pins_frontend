import React,{useEffect} from "react";
import { useNavigate} from "react-router";
import { useLogin, useSession } from "../contexts/AuthProvider";
import { NavLink } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,Alert,AlertIcon,AlertTitle,AlertDescription,
  Image,FormErrorMessage, Link, Text
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export default function Login () {
  const history = useNavigate();
  const { loading, error, isAuthed } = useSession();
  const login = useLogin();
  const { t } = useTranslation("pages", { keyPrefix: "login" });

  const SigninSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, t("input-error.password.minLength"))
      .required(t("input-error.password.required")),
    email: Yup.string().email(t("input-error.email.incorrect")).required(t("input-error.email.required"))
  });

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
              email: "",
              password: ""
            }}
            validationSchema={SigninSchema}
            onSubmit={async (values) => {
              await login(values.email, values.password);
            }}
          >
            <Form>
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
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}>
                </Stack>
                <Button data-cy="login_btn" type="submit" colorScheme={"red"} variant={"solid"} isLoading={loading}>
                  {t("button.signin")}
                </Button>
              </Stack>
            </Form>
          </Formik>
          <Stack pt={6}>
            <Text align={"center"}>
              {t("extra")} <Link as={NavLink} to="/register" color={"blue.600"}>{t("register")}</Link>
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
