import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';

const User = () => {
    const { user_id } = useParams(); // Get user_id from the URL
    const [user, setUser] = useState(null); // State to store user data
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to store error messages
    // console.log(user_id);
    

    // Fetch user data from the backend
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userIdNumber = parseInt(user_id, 10); // Convert user_id to a number
                const response = await axios.get(`http://localhost:5000/users/${userIdNumber}`);
                setUser(response.data); // Set the fetched user data
                // console.log(response.data.rating);
                
                setLoading(false); // Set loading to false
            } catch (err) {
                setError(err.message); // Set error message
                setLoading(false); // Set loading to false
            }
        };
        fetchUser();
    }, [user_id]); // Re-run effect if user_id changes

    // Display loading state
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Loading user data...</h2>
                <div className="spinner"></div>
            </div>
        );
    }

    // Display error state
    if (error) {
        return (
            <div style={{ color: 'red', padding: '20px' }}>
                <h2>Error</h2>
                <p>{error}</p>
                <p>Please check the user ID or try again later.</p>
            </div>
        );
    }

    // Display user data
    return (
        <Layout style={{ padding: '20px' }}>
            
            <h1>User Details</h1>
            {user ? (
                <div style={cardStyle}>
                    <h2>{user.username || 'Unknown Username'}</h2>
                    <p><strong>ID:</strong> {user.id || 'N/A'}</p>
                    <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                    <p><strong>Full Name:</strong> {user.full_name || 'N/A'}</p>
                    <p><strong>Rating :</strong> {user.rating || '0'}</p>
                    <p><strong>Role:</strong> {user.role || 'N/A'}</p>
                    <p><strong>Joined At:</strong> {user.joined_at || 'N/A'}</p>
                    <h3>Problems Solved</h3>
                    <ul>
                        <li>Easy: {user.problems_solved_by_category?.easy || 0}</li>
                        <li>Medium: {user.problems_solved_by_category?.medium || 0}</li>
                        <li>Hard: {user.problems_solved_by_category?.hard || 0}</li>
                    </ul>
                </div>
            ) : (
                <div>No user data available.</div>
            )}
        </Layout>
    );
};

// Styles for the card
const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export default User;