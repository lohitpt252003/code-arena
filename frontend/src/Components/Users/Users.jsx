import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout/Layout';

const Users = () => {
    const [users, setUsers] = useState([]); // State to store the list of users
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to store error messages

    // Fetch users from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                setUsers(response.data); // Set the fetched users
                setLoading(false); // Set loading to false
                // console.log(response.data);
                
            } catch (err) {
                setError(err.message); // Set error message
                setLoading(false); // Set loading to false
            }
        };

        fetchUsers();
    }, []); // Empty dependency array ensures this runs only once

    // Display loading state
    if (loading) {
        return <div>Loading users...</div>;
    }

    // Display error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Layout >
            <h1>Users</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>ID</th>
                        <th style={tableHeaderStyle}>Username</th>
                        <th style={tableHeaderStyle}>Email</th>
                        <th style={tableHeaderStyle}>Full Name</th>
                        <th style={tableHeaderStyle}>Role</th>
                        <th style={tableHeaderStyle}>Problems Solved</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} style={tableRowStyle}>
                            <td style={tableCellStyle}>{user.id}</td>
                            <td style={tableCellStyle}><a href={`/users/${user.id}`}>{user.username}</a></td>
                            <td style={tableCellStyle}>{user.email}</td>
                            <td style={tableCellStyle}>{user.full_name}</td>
                            <td style={tableCellStyle}>{user.role}</td>
                            <td style={tableCellStyle}>
                                Easy: {user.problems_solved_by_category?.easy || 0},
                                Medium: {user.problems_solved_by_category?.medium || 0},
                                Hard: {user.problems_solved_by_category?.hard || 0}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
};

// Styles for the table
const tableHeaderStyle = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
};

const tableRowStyle = {
    border: '1px solid #ddd',
};

const tableCellStyle = {
    padding: '10px',
    border: '1px solid #ddd',
};

export default Users;