import client from "../lib/httpClient";

export interface User {
  _id?: string;
  name: string;
  dob: string;
  email: string;
  phone: string;
}

export const addUser = async (user: User) => {
  const response: any = await client.post<User>("/users", user);
  if (response?.success === true) {
    return response?.data;
  } else {
    return response?.response;
  }
};

export const getUsers = async () => {
  const { data }: any = await client.get<User[]>("/users");
  return data?.data;
};

export const deleteUserFunc = async (id: string) => {
  const { data } = await client.delete(`/users/${id}`);
  return data;
};
