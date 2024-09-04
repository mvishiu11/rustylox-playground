import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Divider, ListSubheader, Button } from '@mui/material';
import { styled } from '@mui/system';

interface Example {
  name: string;
  code: string;
}

interface ExamplesSectionProps {
  examples: Example[];
  onSelectExample: (code: string) => void;
}

const GridList = styled(List)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',
  padding: '16px',
});

const ThinDrawer = styled(Drawer)({
  width: '500px',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '500px',
    boxSizing: 'border-box',
  },
});

const StyledSubheader = styled(ListSubheader)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: '2',
});

const ExamplesSection: React.FC<ExamplesSectionProps> = ({ examples, onSelectExample }) => {

  return (
    <ThinDrawer
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <StyledSubheader>
        Examples
      </StyledSubheader>
      <GridList>
        {examples.map((example) => (
          <Button key={example.name} onClick={() => onSelectExample(example.code)}>
            <ListItem>
              <ListItemText primary={example.name} />
            </ListItem>
          </Button>
        ))}
      </GridList>
    </ThinDrawer>
  );
};

export default ExamplesSection;