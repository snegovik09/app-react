import React, { useState } from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css";
const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        
    };
    const renderPhrase = (number) => {console.log(2)};
    // users.forEach((item, i) => console.log(i))

    const changeColors = (value) => {
        return "badge bg-" + value + " mx-1";
    };
    const getQualitie = (num) => {
        return (users[num].qualities.map((qualitie) => (
            <span class={changeColors(qualitie.color)}>{qualitie.name}</span>
        )))
    };
    const renderRow = (num) => {
        return (
            <>
                <tr>
                    <td>{users[num].name}</td>
                    <td>{getQualitie(num)}</td>
                    <td>{users[num].profession.name}</td>
                    <td>{users[num].completedMeetings}</td>
                    <td>{users[num].rate}/5</td>
                    <td></td>
                </tr>
            </>
        )
    }
    
    return (
        <>
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