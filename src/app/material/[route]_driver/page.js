"use client";

import React from "react";
import { usePathname } from "next/navigation";
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import ForgotPasswordPage from "./auth/ForgotPasswordPage";

const AuthPage = () => {
  const pathName = usePathname();
  const route = pathName.split('/').pop();

  const renderContent = () => {
    switch (route) {
      case "login":
        return <LoginPage />;
      case "signup":
        return <SignupPage />;
      case "forgot-password":
        return <ForgotPasswordPage />;
      default:
        return <p>Page not found</p>;
    }
  };

  return <div>{renderContent()}</div>;
};

export default AuthPage;
