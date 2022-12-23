import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import SearchUser from "../../common/form/searchUser";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [findUser, setFindUser] = useState("");
    const { users } = useUser();
    const pageSize = 8;

    const handleDelete = (userId) =>
        // setUsers(users.filter((item) => item._id !== userId));
        console.log(userId);
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArray);
        console.log(newArray);
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        if (selectedProf) {
            setFindUser("");
        }
    }, [selectedProf]);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    if (users) {
        const handleSearchUser = (e) => {
            setFindUser(e.target.value);
            setSelectedProf();
        };
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : findUser !== ""
            ? users.filter(
                  (user) =>
                      user.name.toLowerCase().indexOf(findUser.toLowerCase()) >
                      -1
              )
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <>
                <div className="d-flex">
                    {professions && (
                        <div className="d-flex flex-column flex-shrink-0 p-3">
                            <GroupList
                                selectedItem={selectedProf}
                                items={professions}
                                onItemSelect={handleProfessionSelect}
                            />
                            <button
                                className="btn btn-secondary mt-2"
                                onClick={clearFilter}
                            >
                                {" "}
                                Очистить
                            </button>
                        </div>
                    )}
                    <div className="d-flex flex-column">
                        <SearchStatus length={count} />
                        <SearchUser
                            value={findUser}
                            onChange={handleSearchUser}
                        />
                        {count > 0 && (
                            <UserTable
                                users={userCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onDelete={handleDelete}
                                onToggleBookMark={handleToggleBookMark}
                            />
                        )}
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return "loading";
};

UsersListPage.propTypes = {
    users: PropTypes.array,
    count: PropTypes.number
};

export default UsersListPage;
