import React, { useContext } from "react";
import { MadeWithTag } from "../MadeWithTag";
import { SelectedTag } from "../SelectedTag";
import Image from "next/image";
import { StateContext } from "../../pages/_app";

export const BasicDefault = () => {
  const { state, dispatch } = useContext(StateContext);
  return (
    <div
      className={`relative p-3 md:p-6 rounded-lg bg-xlight border-4 hover:cursor-pointer group transition-all duration-150 ease-in-out w-66 ip12:w-70 sm:w-96 ${
        state.selectedStyle === "basic-default"
          ? "border-brand"
          : "border-xlight"
      }`}
      onClick={() => {
        dispatch({
          type: "select-style",
          payload: "basic-default",
        });
      }}
    >
      {state.selectedStyle === "basic-default" ? <SelectedTag /> : null}
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg md:p-8 shadow-light/30">
        <div className="flex items-center justify-center h-full mb-2 w-36">
          <Image
            src="/profile.jpg"
            width={102}
            height={102}
            className="object-scale-down overflow-hidden rounded-full"
          />
        </div>
        <h1 className="mb-1 text-xl font-bold sm:text-2xl text-dark">
          Lauren Jenkins
        </h1>
        <h2 className="text-xs font-semibold tracking-wider sm:text-base text-brand">
          @laurenjenkins90
        </h2>
        <p className="mb-0 text-sm tracking-wide text-center text-mid">
          A designer and developer in Queensland, Australia. Coding by day,
          designing by night.
        </p>
      </div>
      <MadeWithTag />
    </div>
  );
};
