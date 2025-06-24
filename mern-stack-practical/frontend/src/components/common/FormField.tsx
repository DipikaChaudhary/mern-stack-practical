import React from "react";
import { TextField } from "@mui/material";

interface FormFieldProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: boolean;
  helperText?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  placeholder,
  onChange,
  type = "text",
  error = false,
  helperText = "",
  onBlur,
}) => {
  return (
    <TextField
      label={label}
      fullWidth
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      error={error}
      helperText={helperText}
      InputLabelProps={{ shrink: true }}
      margin="normal"
    />
  );
};

export default FormField;
