"use client";
import FormStructure from "./FormStructure";
import FormInput from "./FormInput";
import loginForm from "@/app/login/login.json";

import { Stack, Button, FormHelperText } from "@mui/material";

import { useForm, SubmitHandler } from "react-hook-form";
import { signInSchema, signInType } from "@/validations/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useState, useEffect } from "react";
import {
  fetchUsers,
  setUserName,
  usersSelector,
} from "@/app/slices/usersSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const router = useRouter();
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { users } = useAppSelector(usersSelector);
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

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const submitHandler: SubmitHandler<signInType> = (data) => {
    setIsSubmitting(true);
    const found = users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (found) {
      setInvalidCredentials(false);
      const userName = data.email.substring(0, data.email.indexOf("@"));
      dispatch(setUserName(userName));
      toast.success("Login successful! Redirecting...", {
        autoClose: 1500,
        onClose: () => router.push("/products"),
      });
    } else {
      setInvalidCredentials(true);
      toast.error("Invalid credentials", { autoClose: 2000 });
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
