import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Divider, ListSubheader, Button } from '@mui/material';

interface Example {
  name: string;
  code: string;
}

interface ExamplesSectionProps {
  examples: Example[];
  onSelectExample: (code: string) => void;
}

const ExamplesSection: React.FC<ExamplesSectionProps> = ({ examples, onSelectExample }) => {

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List
        subheader={<ListSubheader component="div">Examples</ListSubheader>}
      >
        {examples.map((example) => (
          <Button key={example.name} onClick={() => onSelectExample(example.code)}>
            <ListItem>
              <ListItemText primary={example.name} />
            </ListItem>
           </Button>
        ))}
      </List>
    </Drawer>
  );
};

export default ExamplesSection;
