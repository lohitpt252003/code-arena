import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom'; // Import Link

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
            } catch (err) {
                setError(err.message); // Set error message
                setLoading(false); // Set loading to false
            }
        };
        fetchUsers();
    }, []); // Empty dependency array ensures this runs only once

    // Display loading state
    if (loading) {
        return <div>
                    <Navbar />
                    <h1>Loading users...</h1>
                </div>;
    }

    // Display error state
    if (error) {
        return <div>
                    <Navbar />
                    <h1>Error: {error}</h1>
                </div>;
    }

    return (
        <div>
            <Navbar />
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Problems Solved</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            {/* Use Link instead of <a> */}
                            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                            <td>{user.email}</td>
                            <td>{user.full_name}</td>
                            <td>{user.role}</td>
                            <td>
                                Easy: {user.problems_solved_by_category?.easy || 0},
                                Medium: {user.problems_solved_by_category?.medium || 0},
                                Hard: {user.problems_solved_by_category?.hard || 0}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;