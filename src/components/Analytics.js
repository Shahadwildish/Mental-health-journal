import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Grid } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { getMoodEntries, getReflections } from '../api';
import { useAuth } from '../contexts/AuthContext';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

const Analytics = () => {
    const [moodEntries, setMoodEntries] = useState([]);
    const [reflections, setReflections] = useState([]);
    const user = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const moodData = await getMoodEntries(user.user.userId);
                const reflectionData = await getReflections(user.user.userId);
                setMoodEntries(moodData);
                setReflections(reflectionData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Prepare data for pie charts and bar graphs
    const moodLabels = moodEntries.map(entry => entry.category);
    const moodCounts = moodLabels.reduce((acc, label) => {
        acc[label] = (acc[label] || 0) + 1;
        return acc;
    }, {});

    const reflectionDates = reflections.map(ref => new Date(ref.date).toDateString());
    const reflectionCounts = reflectionDates.reduce((acc, date) => {
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const moodData = {
        labels: Object.keys(moodCounts),
        datasets: [
            {
                data: Object.values(moodCounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#BBBBB'],
            },
        ],
    };

    const reflectionData = {
        labels: Object.keys(reflectionCounts),
        datasets: [
            {
                label: 'Reflections',
                data: Object.values(reflectionCounts),
                backgroundColor: '#4BC0C0',
            },
        ],
    };

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h4" gutterBottom>
                Analytics
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Mood Frequency
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <Pie data={moodData} />
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Reflection Frequency
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <Bar
                                data={reflectionData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Analytics;
