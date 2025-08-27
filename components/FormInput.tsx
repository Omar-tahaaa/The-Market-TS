"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<TfieldValue extends FieldValues> = {
  label: string;
  name: Path<TfieldValue>;
  register: UseFormRegister<TfieldValue>;
  error?: string;
  type?: string;
  options?: { label: string; value: string }[];
  isSubmitting: boolean;
};

const FormInput = <TfieldValue extends FieldValues>({
  label,
  name,
  register,
  isSubmitting,
  error,
  type = "text",
  options,
}: InputProps<TfieldValue>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  if (type === "select") {
    return (
      <FormControl disabled={isSubmitting}>
        <InputLabel id={name}>{label}</InputLabel>
        <Select
          label={label}
          labelId={name}
          id={name}
          defaultValue=""
          {...register(name)}
        >
          <MenuItem value="">
            <em>-- Select --</em>
          </MenuItem>
          {options?.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }

  if (type === "checkbox") {
    return (
      <FormControl disabled={isSubmitting}>
        <FormControlLabel
          control={<Checkbox {...register(name)} />}
          label={label}
        />
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }

  return (
    <FormControl disabled={isSubmitting}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        id={name}
        {...register(name)}
        type={showPassword ? "text" : type}
        endAdornment={
          type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
      {error && <FormHelperText id="my-helper-text">{error}</FormHelperText>}
    </FormControl>
  );
};

export default FormInput;
