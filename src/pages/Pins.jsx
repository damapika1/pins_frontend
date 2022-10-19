
import React from "react";
import { usePins } from "../contexts/PinsProvider";
import {Skeleton} from "@chakra-ui/react";
import { Navigate,useNavigate } from "react-router-dom";
import { useSession } from "../contexts/AuthProvider";
import PinsList from "../components/pins/PinsList";
import { useEffect } from "react";

const Pins = () => {
  const { pins, error, loading } = usePins();
  const { isAuthed } = useSession();
  const navigate =useNavigate();

  useEffect(() => {
    if(!isAuthed)
      navigate("/login",{replace:true});
  }, [isAuthed]);

  useEffect(() => {
    if(error)
      navigate("/notFound",{replace:true});
  }, [error]);

  if (loading) {
    return <Skeleton data-cy="loading"><h1>Loading...</h1></Skeleton>;
  }
  if (error) {
    <Navigate to="/notFound" replace={true}/>;
  }
  if (!isAuthed) {
    <Navigate to="/login" replace={true}/>;
  }

  return (
    <>
      <PinsList  pins={pins}/>
    </>
  );
};
export default Pins;
