import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import EditUserPage from "../components/page/userPage/editUserPage";
import UserListPage from "../components/page/usersListPage";
const Users = () => {
    const { userId } = useParams();
    const { edit } = useParams();
    return (
        <>
            {edit ? (
                <EditUserPage userId={userId} />
            ) : userId ? (
                <UserPage userId={userId} />
            ) : (
                <UserListPage />
            )}
        </>
    );
};

export default Users;
