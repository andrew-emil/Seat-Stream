"use client";

import React, { useActionState } from "react";
import {
  FormTextField,
  PasswordTextField,
} from "@/app/_components/StyledComponents";
import SubmitButton from "@/app/_components/SubmitButton";
import { login } from "@/app/actions/loginAction";
import { Typography } from "@mui/material";
import Link from "next/link";

function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  return (
    <form action={loginAction}>
      <FormTextField
        required
        type="email"
        name={"email"}
        id="standard-basic"
        label="Email"
        variant="standard"
        error={(state?.errors?.email || []).length > 0}
        helperText={(state?.errors?.email || [])[0]}
      />
      <PasswordTextField
        required
        id="standard-basic"
        label="Password"
        name={"password"}
        variant="standard"
        error={(state?.errors?.email || []).length > 0}
        helperText={(state?.errors?.email || [])[0]}
      />
      <SubmitButton title="Login" />
      <br />
      <Typography sx={{ textAlign: "center", marginTop: "1rem" }}>
        <Link href="/forgot-password">Forgot Password?</Link>
      </Typography>
      <Typography
        variant="body2"
        sx={{ marginTop: "1rem", textAlign: "center" }}
        className="message"
      >
        Not Registered? <Link href="/register">Create a new account</Link>
      </Typography>
    </form>
  );
}

export default LoginForm;
