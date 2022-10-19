import "./App.css";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CommentsProvider } from "./contexts/CommentsProvider";
import { PinsProvider } from "./contexts/PinsProvider";
import Home from "./pages/Home";
import MainMenu from "./components/shared/MainMenu";
import { AuthProvider } from "./contexts/AuthProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pins from "./pages/Pins";
import PrivateRoute from "./components/shared/PrivateRoute";
import MyAccount from "./pages/MyAccount";
import Footer from "./components/shared/Footer";
import theme from "./styles/theme";
import ViewPin from "./pages/ViewPin";
import NotFound from "./pages/NotFound";

function App () {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <PinsProvider>
          <CommentsProvider>
            <BrowserRouter>
              <MainMenu />
              <Routes>
                <Route exact path="/" element={<Home />} />

                <Route exact path="/pins" element={
                  <PrivateRoute>
                    <Pins />
                  </PrivateRoute>} />

                <Route exact path="/pins/:id" element={
                  <PrivateRoute>
                    <ViewPin/>
                  </PrivateRoute>} />

                <Route exact path="/account" element={
                  <PrivateRoute>
                    <MyAccount />
                  </PrivateRoute>} />
                <Route exact path="/notFound" element={<NotFound/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/register" element={<Register/>} />
                <Route path="/*" element={<NotFound/>} />
              </Routes>
              <Footer/>
            </BrowserRouter>
          </CommentsProvider >
        </PinsProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
