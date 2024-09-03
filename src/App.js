import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import init, { tokenize, parse, interpret } from './rustylox-pkg';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('interpret');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    init().then(() => console.log('Wasm module initialized'));
  }, []);

  const handleRun = () => {
    let result;
    switch (mode) {
      case 'tokenize':
        result = tokenize(code);
        break;
      case 'parse':
        result = parse(code);
        break;
      case 'interpret':
        result = interpret(code);
        break;
      default:
        result = 'Invalid mode selected.';
    }
    setOutput(result);
  };

  const examples = [
    { name: "Hello World", code: 'print("Hello, world!");' },
    { name: "Simple Addition", code: 'print(1 + 2);' },
    { name: "Conditional", code: 'if (true) { print("It is true!"); } else { print("It is false!"); }' }
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const loadExample = (exampleCode) => {
    setCode(exampleCode);
    setDrawerOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Language Playground
          </Typography>
          <Button color="inherit" href="https://github.com/mvishiu11/rustylox" target="_blank">GitHub</Button>
          <Button color="inherit" href="https://craftinginterpreters.com/" target="_blank">Crafting Interpreters</Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {examples.map((example) => (
              <ListItem button key={example.name} onClick={() => loadExample(example.code)}>
                <ListItemText primary={example.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box sx={{ padding: 2 }}>
        <TextField
          label="Code"
          multiline
          rows={10}
          fullWidth
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
          <Button variant="contained" color="primary" onClick={() => setMode('tokenize')}>Tokenize</Button>
          <Button variant="contained" color="secondary" onClick={() => setMode('parse')}>Parse</Button>
          <Button variant="contained" color="success" onClick={() => setMode('interpret')}>Interpret</Button>
          <Button variant="contained" onClick={handleRun}>Run</Button>
        </Box>
        <TextField
          label="Output"
          multiline
          rows={10}
          fullWidth
          variant="outlined"
          value={output}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
    </div>
  );
}

export default App;