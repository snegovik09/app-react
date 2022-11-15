import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import _ from "lodash";
import PropTypes from "prop-types";
import QualitiesList from "../../ui/qualities/qualitiesList";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
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
                <Link to={`${user._id}/edit`}>
                    <button>Изменить</button>
                </Link>
            </>
        );
    }
    return <h1>loading</h1>;
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
