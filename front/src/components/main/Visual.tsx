"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";

const Visual = ({ name }: {name: string} ) => {


  const [username, setUsername] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const style = {
    buttonStyle:
      "px-4 py-2 m-4 text-white bg-blue-400 rounded-[1.1rem] ",
    inputStyle: "m-4 border-2 border-blue-400 ",
  };

  // const onClickLogIn = () => {
  //   dispatch(logIn(username));
  // };
  
  // const onClickLogOut = () => {
  //   dispatch(logOut());
  // };


  return (
    <div className="flex">
      <input
        className={style.inputStyle}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
    

      
    </div>
  )
}

export default Visual