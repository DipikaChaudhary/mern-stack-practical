import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUsers, User } from "../api/userApi";
import AddNewUserPage from "./AddNewUserPage";
import DeleteUser from "./DeleteUser";

const AllUsersListPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <h1>User Data Table</h1>
      </div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add New
      </Button>
      <AddNewUserPage open={open} onClose={() => setOpen(false)} />
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    {new Date(user.dob).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setSelectedUserId(user._id!);
                        setOpenConfirmDialog(true);
                      }}
                      disabled={openConfirmDialog}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {openConfirmDialog === true ? (
        <DeleteUser
          open={openConfirmDialog}
          userId={selectedUserId}
          onClose={() => {
            setOpenConfirmDialog(false);
            setSelectedUserId(null);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AllUsersListPage;
