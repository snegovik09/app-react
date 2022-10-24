import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitiesList";
import _ from "lodash";

const UserPage = ({userId}) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const handleAllUsers = () => {
        history.replace("/users");
    };
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>{`Профессия: ${_.get(user, "profession.name")}`}</h2>
                {<QualitiesList qualities={user.qualities} />}
                <div>{`completedMeetings: ${user.completedMeetings}`}</div>
                <h2>{`Rate: ${user.rate}`}</h2>
                <button onClick={handleAllUsers}>Все пользователи</button>
            </>
        );
    }
    return <h1>loading</h1>;
};

export default UserPage;
