import React from 'react';
import { Box, TextField, Button } from '@mui/material';

interface MainAreaProps {
  code: string;
  output: string;
  onCodeChange: (newCode: string) => void;
  onRun: () => void;
  setMode: (mode: string) => void;
}

const MainArea: React.FC<MainAreaProps> = ({ code, output, onCodeChange, onRun, setMode }) => {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <TextField
        label="Code"
        multiline
        rows={10}
        fullWidth
        variant="outlined"
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        sx={{ width: '80%', maxWidth: '800px', marginBottom: '20px' }}
      />
      <Box sx={{ marginBottom: 2, textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={() => setMode('tokenize')} sx={{ mr: 1 }}>
          Tokenize
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setMode('parse')} sx={{ mr: 1 }}>
          Parse
        </Button>
        <Button variant="contained" color="success" onClick={() => setMode('interpret')} sx={{ mr: 1 }}>
          Interpret
        </Button>
        <Button variant="contained" onClick={onRun}>
          Run
        </Button>
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
        sx={{ width: '80%', maxWidth: '800px', marginTop: '20px' }}
      />
    </Box>
  );
};

export default MainArea;
