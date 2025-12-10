"use client";
import FormStructure from "./FormStructure";
import FormInput from "./FormInput";

import { Button, FormHelperText, Stack } from "@mui/material";
import registerForm from "@/app/register/register.json";

import { signUpSchema, signUpType } from "@/validations/signUpSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchUsers,
  setNewUsers,
  usersSelector,
} from "@/app/slices/usersSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const RegistrationForm = () => {
  const router = useRouter();

  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { users } = useAppSelector(usersSelector);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const submitHandler: SubmitHandler<signUpType> = async (data) => {
    setIsSubmitting(true);
    let isEmailExists = false;
    users.map((user) => {
      if (user.email === data.email) {
        setEmailExists(true);
        isEmailExists = true;
      }
    });
    if (isEmailExists) {
      setIsSubmitting(false);
      return;
    }
    try {
      const { data: userData } = await axios.post("/api/users", data);
      dispatch(setNewUsers(userData));
      setEmailExists(false);
      reset();

      toast.success("Registered successfully! Redirecting to login...", {
        autoClose: 1500,
        onClose: () => router.push("/login"),
      });
    } catch (error) {
      toast.error("Registration failed. Please try again.", {
        autoClose: 2000,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <FormStructure type="Registration">
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing={2}>
          {registerForm.map((input) => (
            <FormInput
              key={input.id}
              label={input.label}
              name={input.name as keyof signUpType}
              register={register}
              error={errors[input.name as keyof signUpType]?.message}
              type={input.type}
              options={input.options}
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
            Register
          </Button>
          {emailExists && (
            <FormHelperText id="my-helper-text">
              Email is already exists
            </FormHelperText>
          )}
        </Stack>
      </form>
    </FormStructure>
  );
};

export default RegistrationForm;
