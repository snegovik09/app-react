import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import EditUserPage from "../components/page/userPage/editUserPage";
import UserListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";
const Users = () => {
    const { userId } = useParams();
    const { edit } = useParams();
    return (
        <>
            <UserProvider>
                {edit ? (
                    <EditUserPage userId={userId} />
                ) : userId ? (
                    <UserPage userId={userId} />
                ) : (
                    <UserListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
