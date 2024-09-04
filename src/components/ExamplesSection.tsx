import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Divider,
  ListSubheader,
  Button,
  useMediaQuery,
  Theme,
} from '@mui/material';
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

const ThinDrawer = styled(Drawer)(({ theme }) => ({
  width: '25vw',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '25vw',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  },
}));

const StyledSubheader = styled(ListSubheader)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: '2',
});

const ExamplesSection: React.FC<ExamplesSectionProps> = ({ examples, onSelectExample }) => {
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  if (isSmallScreen) {
    return (
      <Drawer variant="temporary" anchor="bottom">
        <Toolbar />
        <Divider />
        <StyledSubheader>
          Examples
        </StyledSubheader>
        <List>
          {examples.map((example) => (
            <Button key={example.name} onClick={() => onSelectExample(example.code)}>
              <ListItem>
                <ListItemText primary={example.name} />
              </ListItem>
            </Button>
          ))}
        </List>
      </Drawer>
    )
  }

  return (
    <ThinDrawer variant="permanent" anchor="left">
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
