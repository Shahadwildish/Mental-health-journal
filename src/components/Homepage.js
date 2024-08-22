
import React from 'react';
import { Button, Typography, Card, CardContent } from '@mui/material';
import { createMoodEntry } from '../api';

const Homepage = () => {
  return (
    <div>
      <header>
        <Typography variant="h4">Welcome, [User]!</Typography>
      </header>
      <section>
        <Typography variant="h6">Recent Entries</Typography>
        {/* Example of a mood entry preview */}
        <Card>
          <CardContent>
            <Typography>Mood: Happy</Typography>
            <Typography>Notes: Had a great day!</Typography>
          </CardContent>
        </Card>
      </section>
      <footer>
        <Button variant="contained">Log Mood</Button>
        <Button variant="contained">View Analytics</Button>
        <Button variant="contained">Explore Resources</Button>
      </footer>
    </div>
  );
};


export default Homepage;
