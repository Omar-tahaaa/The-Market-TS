"use client";
import FormStructure from "./FormStructure";
import FormInput from "./FormInput";
import loginForm from "@/app/login/login.json";

import { Stack, Button, FormHelperText } from "@mui/material";

import { useForm, SubmitHandler } from "react-hook-form";
import { signInSchema, signInType } from "@/validations/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/store/hooks";
import { useState } from "react";
import { setUserName } from "@/app/slices/usersSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const LoginForm = () => {
  const router = useRouter();
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const submitHandler: SubmitHandler<signInType> = async (data) => {
    setIsSubmitting(true);
    setInvalidCredentials(false);

    try {
      const response = await axios.post("/api/users/login", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const userName = data.email.substring(0, data.email.indexOf("@"));
        dispatch(setUserName(userName));
        toast.success("Login successful! Redirecting...", {
          autoClose: 1500,
          onClose: () => router.push("/products"),
        });
      }
    } catch (error: any) {
      setInvalidCredentials(true);
      const errorMessage = error.response?.data?.error || "Invalid credentials";
      toast.error(errorMessage, { autoClose: 2000 });
      setIsSubmitting(false);
    }
  };

  return (
    <FormStructure type="Login">
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing={2}>
          {loginForm.map((input) => (
            <FormInput
              key={input.name}
              name={input.name as keyof signInType}
              register={register}
              error={errors[input.name as keyof signInType]?.message}
              label={input.label}
              type={input.type}
              isSubmitting={isSubmitting}
            />
          ))}
          <Button
            variant="contained"
            color="success"
            type="submit"
            size="large"
            sx={{ mt: 1 }}
            fullWidth
            disabled={isSubmitting}
          >
            Login
          </Button>
          {invalidCredentials && (
            <FormHelperText id="my-helper-text">
              Invalid credentials
            </FormHelperText>
          )}
        </Stack>
      </form>
    </FormStructure>
  );
};

export default LoginForm;
