import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout'

const Problem = () => {
    const { problem_id } = useParams(); // Get the problem ID from the URL
    const [problem, setProblem] = useState(null); // State to store the problem details
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to store error messages

    // Fetch problem details from the backend
    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/problems/${problem_id}`);
                setProblem(response.data); // Set the fetched problem details
                setLoading(false); // Set loading to false
            } catch (err) {
                setError(err.message); // Set error message
                setLoading(false); // Set loading to false
            }
        };
        fetchProblem();
    }, [problem_id]); // Re-run effect if the problem ID changes

    // Display loading state
    if (loading) {
        return <div style={styles.loading}>Loading problem details...</div>;
    }

    // Display error state
    if (error) {
        return <div style={styles.error}>Error: {error}</div>;
    }

    // Display problem details
    return (
        <Layout style={styles.container}>
            <h1 style={styles.heading}>{problem.title}</h1>
            <div style={styles.detailsContainer}>
                <section style={styles.section}>
                    <h2 style={styles.subHeading}>Description</h2>
                    <p>{problem.description}</p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.subHeading}>Input Format</h2>
                    <p>{problem.input_format}</p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.subHeading}>Output Format</h2>
                    <p>{problem.output_format}</p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.subHeading}>Constraints</h2>
                    <ul>
                        {problem.constraints.map((constraint, index) => (
                            <li key={index}>{constraint}</li>
                        ))}
                    </ul>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.subHeading}>Examples</h2>
                    {problem.examples.map((example, index) => (
                        <div key={index} style={styles.example}>
                            <h3>Example {index + 1}</h3>
                            <p><strong>Input:</strong> {example.input}</p>
                            <p><strong>Expected Output:</strong> {example.expected_output}</p>
                        </div>
                    ))}
                </section>

                <section style={styles.section}>
                    <h2 style={styles.subHeading}>Additional Information</h2>
                    <p><strong>Author:</strong> {problem.author}</p>
                    <p><strong>Tester:</strong> {problem.tester}</p>
                    <p><strong>Difficulty:</strong> {problem.difficulty || 'N/A'}</p>
                    <p><strong>Tags:</strong> {problem.tags.join(', ') || 'N/A'}</p>
                    <p><strong>Time Limit:</strong> {problem.time_limit}</p>
                    <p><strong>Memory Limit:</strong> {problem.memory_limit}</p>
                </section>
            </div>
        </Layout>
    );
};

// Styles for the component
const styles = {
    container: {
        padding: '20px',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    detailsContainer: {
        maxWidth: '800px',
        margin: '0 auto',
    },
    section: {
        marginBottom: '20px',
    },
    subHeading: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: '10px',
    },
    example: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9',
    },
    loading: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '18px',
        color: '#666',
    },
    error: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '18px',
        color: 'red',
    },
};

export default Problem;