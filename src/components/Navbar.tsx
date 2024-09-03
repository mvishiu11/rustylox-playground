import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          My Language Playground
        </Typography>
        <Button color="inherit" href="https://github.com/mvishiu11/rustylox" target="_blank">
          GitHub
        </Button>
        <Button color="inherit" href="https://craftinginterpreters.com/" target="_blank">
          Crafting Interpreters
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;