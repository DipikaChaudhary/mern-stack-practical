import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { deleteUserFunc } from "../api/userApi";

interface ConfirmDeleteDialogProps {
  open: boolean;
  userId: string | null;
  onClose: () => void;
}

const DeleteUser: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  userId,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteUserFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
      toast.success("User deleted successfully");
    },
    onError: (error: any) => {
      toast.error(`Failed to delete user: ${error.message || "Unknown error"}`);
    },
  });

  const handleDeleteConfirm = () => {
    if (userId) {
      deleteMutation.mutate(userId);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>Are you sure you want to delete this user?</DialogContent>
      {deleteMutation?.isPending ? (
        <div>Loading...</div>
      ) : (
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DeleteUser;
