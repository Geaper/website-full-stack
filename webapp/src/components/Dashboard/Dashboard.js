import React, { useState, useEffect } from 'react';
import '../../configs';

const Dashboard = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const data = await fetch(global.apiBaseURL + "/users").then(dataPromise => dataPromise.json()).then(data => {
            setUsers(data);
        });
    };

    fetchUsers();
    
    return (
        <div className="App">
           {users.map(user => (
               <h1 key={user.id}>{user.firstname}</h1>
           ))}
           <h1>{users.length}</h1>

        </div>
    );
}

export default Dashboard;