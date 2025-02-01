import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';

const Problems = () => {
    const [problems, setProblems] = useState([]); // State to store the list of problems
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to store error messages

    // Fetch problems from the backend
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/problems');
                setProblems(response.data); // Set the fetched problems
                setLoading(false); // Set loading to false
                console.log(response.data);
                
            } catch (err) {
                setError(err.message); // Set error message
                setLoading(false); // Set loading to false
            }
        };

        fetchProblems();
    }, []); // Empty dependency array ensures this runs only once

    // Display loading state
    if (loading) {
        return <div>Loading problems...</div>;
    }

    // Display error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Layout style={{ padding: '20px' }}>
            <h1>Problems</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>ID</th>
                        <th style={tableHeaderStyle}>Title</th>
                        <th style={tableHeaderStyle}>Difficulty</th>
                        <th style={tableHeaderStyle}>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {problems.map((problem) => (
                        <tr key={problem.id} style={tableRowStyle}>
                            <td style={tableCellStyle}>{problem.id}</td>
                            <td style={tableCellStyle}>
                                <Link to={`/problems/${problem.id}`}>{problem.title}</Link>
                            </td>
                            <td style={tableCellStyle}>{problem.difficulty || "N/A"}</td>
                            <td style={tableCellStyle}>{problem.tags.join(', ') || "N/A"}</td>
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

export default Problems;