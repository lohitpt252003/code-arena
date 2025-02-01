import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Container, 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    CircularProgress, 
    Alert, 
    Button 
} from '@mui/material';

const Contests = () => {
    const [contests, setContests] = useState([]); // State to store contests
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to store error messages

    // Fetch contests from the backend
    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/contests');
                setContests(response.data); // Set the fetched contests
                setLoading(false); // Set loading to false
            } catch (err) {
                setError(err.message); // Set error message
                setLoading(false); // Set loading to false
            }
        };

        fetchContests();
    }, []); // Empty dependency array ensures this runs only once

    // Handle joining a contest
    const handleJoinContest = (contestId) => {
        alert(`Joining contest with ID: ${contestId}`);
        // Add logic to navigate to the contest page or perform other actions
    };

    // Display loading state
    if (loading) {
        return (
            <Container style={{ textAlign: 'center', marginTop: '20px' }}>
                <CircularProgress />
                <Typography variant="body1">Loading contests...</Typography>
            </Container>
        );
    }

    // Display error state
    if (error) {
        return (
            <Container style={{ textAlign: 'center', marginTop: '20px' }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                Contests
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Title</strong></TableCell>
                            <TableCell><strong>Start Time</strong></TableCell>
                            <TableCell><strong>End Time</strong></TableCell>
                            <TableCell><strong>Duration</strong></TableCell>
                            <TableCell><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contests.map((contest) => (
                            <TableRow key={contest.id}>
                                <TableCell>{contest.id}</TableCell>
                                <TableCell><a href={`/contests/${contest.id}`}>{contest.title}</a></TableCell>
                                <TableCell>{contest.start_time}</TableCell>
                                <TableCell>{contest.end_time}</TableCell>
                                <TableCell>{contest.duration}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleJoinContest(contest.id)}
                                    >
                                        Join Contest
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Contests;