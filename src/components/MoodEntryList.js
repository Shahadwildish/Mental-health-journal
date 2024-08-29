import React, { useState, useEffect } from 'react';
import { getMoodEntries } from '../api';
import { useAuth } from '../contexts/AuthContext';
import { Typography, Card, CardContent, Container, Grid, CircularProgress } from '@mui/material';

const MoodEntryList = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const user  = useAuth();  // Fetch user data including userId

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                setLoading(true);
                const data = await getMoodEntries(user.user.userId);
                console.log(data); 
                setEntries(data);
            } catch (error) {
                console.error('Error fetching mood entries:', error);
                setError('Failed to fetch mood entries');
            } finally {
                setLoading(false);
            }
        };

        if (user.user.userId) { // Ensure userId is available before making the API call
            fetchEntries();
        }
    }, [user.user.userId]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Mood Entries
            </Typography>
            <Grid container spacing={4}>
                {entries.length > 0 ? (
                    entries.map(entry => (
                        <Grid item xs={12} md={6} key={entry._id}>
                            <Card elevation={3}>
                                <CardContent>
                                    <Typography variant="h4">Mood: {entry.category}</Typography>
                                    <Typography variant="h6">Mood Rating: {entry.moodRating}</Typography>
                                    <Typography>Notes: {entry.notes}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>No mood entries found.</Typography>
                )}
            </Grid>
        </Container>
    );
};

export default MoodEntryList;
