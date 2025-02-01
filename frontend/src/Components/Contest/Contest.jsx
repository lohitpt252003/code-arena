import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { 
    Container, 
    Typography, 
    Paper, 
    CircularProgress, 
    Alert, 
    Button, 
    Grid, 
    List, 
    ListItem, 
    ListItemText 
} from '@mui/material';

const Contest = () => {
    const { contest_id } = useParams(); // Get contest_id from the URL
    const [contest, setContest] = useState(null); // State to store contest details
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to store error messages

    // Fetch contest details from the backend
    useEffect(() => {
        const fetchContest = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/contests/${contest_id}`);
                setContest(response.data); // Set the fetched contest details
                setLoading(false); // Set loading to false
            } catch (err) {
                setError(err.message); // Set error message
                setLoading(false); // Set loading to false
            }
        };

        fetchContest();
    }, [contest_id]); // Re-run effect if contest_id changes

    // Handle joining the contest
    const handleJoinContest = () => {
        alert(`Joining contest with ID: ${contest_id}`);
        // Add logic to navigate to the contest page or perform other actions
    };

    // Display loading state
    if (loading) {
        return (
            <Container style={{ textAlign: 'center', marginTop: '20px' }}>
                <CircularProgress />
                <Typography variant="body1">Loading contest details...</Typography>
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

    // Display contest details
    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                {contest.title}
            </Typography>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Contest Details
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="ID" secondary={contest.id} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Start Time" secondary={contest.start_time} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="End Time" secondary={contest.end_time} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Duration" secondary={contest.duration} />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Problems
                        </Typography>
                        <List>
                            {contest.problems.map((problem, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={`Problem ${index + 1}`} secondary={problem.title} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleJoinContest}
                    style={{ marginTop: '20px' }}
                >
                    Join Contest
                </Button>
            </Paper>
        </Container>
    );
};

export default Contest;