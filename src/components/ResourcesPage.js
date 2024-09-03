import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';


//Just listing list of example resources... maybe create a collection for them? possibly...
const ResourcesPage = () => {
  const resources = [
    {
      type: 'Book',
      name: 'The Happiness Project',
      description: 'A book by Gretchen Rubin on creating a happier life.',
    },
    {
      type: 'Call Center',
      name: 'National Suicide Prevention Lifeline',
      description: '1-800-273-TALK (8255) – A 24/7 helpline for crisis situations.',
    },
    {
      type: 'Video',
      name: 'The Power of Vulnerability',
      description: 'A TED Talk by Brené Brown on the importance of vulnerability.',
    },
    {
      type: 'Therapy',
      name: 'BetterHelp',
      description: 'Online therapy sessions with licensed professionals.',
    }
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Mental Health & Wellbeing Resources
      </Typography>
      <List>
        {resources.map((resource, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${resource.type}: ${resource.name}`}
              secondary={resource.description}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ResourcesPage;
