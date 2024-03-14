"use client";
import store from "@/stores";
import { Provider } from "react-redux";
import React from "react";

export const LayoutProviderContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Provider store={store}>{children}</Provider>;
};
