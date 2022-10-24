import React from "react";
import { useParams } from "react-router-dom";
import Users from "./pages/users";
import UserPage from "./userPage";
const CheckUsers = () => {
    const { userId } = useParams();
    return userId ? <UserPage userId={userId} /> : <Users />;
};

export default CheckUsers;
