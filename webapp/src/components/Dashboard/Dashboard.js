import React from 'react';
import '../../configs';

const Dashboard = () => {

    const fetchUsers = async () => {
        const data = await fetch(global.apiBaseURL + "/users").then(dataPromise => dataPromise.json()).then(data => {
            console.log(data);
        });
    };

    fetchUsers();
    
    return (
        <div className="App">
            <h1>Hello world</h1>
            
        </div>
    );
}

export default Dashboard;