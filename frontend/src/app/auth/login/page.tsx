import React from "react";
import {
  FormCard,
  FormContainer,
  FormTitle,
} from "@/app/_components/StyledComponents";
import LoginForm from "@/app/auth/login/LoginForm";

export default function LoginPage() {
  return (
    <FormContainer sx={{ display: "flex", flexDirection: "column" }}>
      <FormCard>
        <FormTitle>Login To Your Account</FormTitle>
        <LoginForm />
        <br />
      </FormCard>
    </FormContainer>
  );
}
