import React, { useState } from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css";
const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((item) => item.name !== userId))
    };
    const renderList = (num) => {
        return (
            <button type="button" class="btn btn-danger" onClick={() => handleDelete(users[num].name)}>
                delete
            </button>
        )
    }


    const renderPhrase = () => {
        if (users.length === 0) {
            return `Никто с тобой не тусанет`;
        } else if (users.length === 1 || (users.length > 4 && users.length < 13)) {
            return `${users.length} человек тусанет с тобой сегодня`;
        } else if (users.length >= 2 && users.length <= 4) {
            return `${users.length} человека тусанут с тобой сегодня`;
        }
    }
    const changeColors = (value) => {
        return "badge bg-" + value + " mx-1";
    };
    const getQualitie = (num) => {
        return (users[num].qualities.map((qualitie) => (
            <span key={qualitie.name} class={changeColors(qualitie.color)}>{qualitie.name}</span>
        )))
    };
    const renderRow = (num) => {
        return (
            <>
                <tr key={users[num].name}>
                    <td key={users[num].name}>{users[num].name}</td>
                    <td key="0">{getQualitie(num)}</td>
                    <td key={users[num].profession.name}>{users[num].profession.name}</td>
                    <td key={users[num].completedMeetings}>{users[num].completedMeetings}</td>
                    <td key={users[num].rate}>{users[num].rate}/5</td>
                    <td key="1">{renderList(num)}</td>
                </tr>
            </>
        )
    };
    
    return (
        <>
            <h2><span class="badge bg-primary">{renderPhrase()}</span></h2>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item, i) => renderRow(i))}
                </tbody>
            </table>        
        </>
    )
};

export default Users