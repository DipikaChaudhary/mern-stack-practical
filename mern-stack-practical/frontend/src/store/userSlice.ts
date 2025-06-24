import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    name: string;
    dob: string;
    email: string;
    phone: string;
}

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
        },
        addUser(state, action: PayloadAction<User>) {
            state.users.push(action.payload);
        },
        deleteUser(state, action: PayloadAction<string>) {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
    },
});

export const { setUsers, addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
