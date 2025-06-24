import React, { useState, useEffect } from "react";
import { Modal, Button, Box, Stack, Typography } from "@mui/material";
import FormField from "./common/FormField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { addUser } from "../api/userApi";

interface UserFormProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  dob: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  dob?: string;
  email?: string;
  phone?: string;
}

const initialFormData: FormData = {
  name: "",
  dob: "",
  email: "",
  phone: "",
};

const AddNewUserPage: React.FC<UserFormProps> = ({ open, onClose }) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [K in keyof FormData]?: boolean }>(
    {}
  );

  useEffect(() => {
    if (!open) {
      setFormData(initialFormData);
      setFormErrors({});
      setTouched({});
    }
  }, [open]);

  const validateField = (field: keyof FormData, value: string): string => {
    switch (field) {
      case "name":
        return value.trim() ? "" : "Name is required";
      case "dob":
        return value ? "" : "DOB is required";
      case "email":
        if (!value) return "Email is required";
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email format";
      case "phone":
        if (!value) return "Phone is required";
        return /^\d{10}$/.test(value) ? "" : "Phone must be 10 digits";
      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });
    setFormErrors(errors);
    setTouched({ name: true, dob: true, email: true, phone: true });
    return Object.keys(errors).length === 0;
  };

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setFormData(initialFormData);
      setFormErrors({});
      setTouched({});
      onClose();
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(`Failed to Create user: ${error.message || "Unknown error"}`);
    },
  });

  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (touched[field]) {
        const error = validateField(field, value);
        setFormErrors((prev) => ({ ...prev, [field]: error }));
      }
    };

  const handleBlur = (field: keyof FormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setFormErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    mutation.mutate(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: "background.paper",
          width: 400,
          mx: "auto",
          mt: "10%",
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormField
              label="Name"
              value={formData.name}
              placeholder="Enter your name"
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
              error={touched.name && !!formErrors.name}
              helperText={touched.name ? formErrors.name : ""}
            />
            <FormField
              label="Date of Birth"
              type="date"
              value={formData.dob}
              placeholder="Enter your date of birth"
              onChange={handleChange("dob")}
              onBlur={handleBlur("dob")}
              error={touched.dob && !!formErrors.dob}
              helperText={touched.dob ? formErrors.dob : ""}
            />
            <FormField
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              error={touched.email && !!formErrors.email}
              helperText={touched.email ? formErrors.email : ""}
            />
            <FormField
              label="Mobile No."
              placeholder="Enter your Mobile No."
              value={formData.phone}
              onChange={handleChange("phone")}
              onBlur={handleBlur("phone")}
              error={touched.phone && !!formErrors.phone}
              helperText={touched.phone ? formErrors.phone : ""}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                disabled={mutation.isPending}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={onClose}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default AddNewUserPage;
