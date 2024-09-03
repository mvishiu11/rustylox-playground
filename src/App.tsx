import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import ExamplesSection from './components/ExamplesSection';
import MainArea from './components/MainArea';
import init, { interpret, parse, tokenize } from './rustylox-pkg';

interface Example {
  name: string;
  code: string;
}

const examples: Example[] = [
  { name: "Hello World", code: 'print("Hello, world!");' },
  { name: "Simple Addition", code: 'print(1 + 2);' },
  { name: "Conditional", code: 'if (true) { print("It is true!"); } else { print("It is false!"); }' }
];

function App() {
  const [code, setCode] = useState<string>('');
  const [examples, setExamples] = useState<Example[]>([]);
  const [output, setOutput] = useState<string>('');
  const [mode, setMode] = useState<string>('interpret');

  useEffect(() => {
    init().then(() => console.log('Wasm module initialized'));

    // Load .lox example files
    const loadExamples = async () => {
      const context = require.context('./examples', false, /\.lox$/);
      const exampleFiles = context.keys();

      const loadedExamples = await Promise.all(
        exampleFiles.map(async (filename) => {
          const name = filename.replace('./', '').replace('.lox', '');
          const code = await fetch(context(filename)).then((res) => res.text());
          return { name, code };
        })
      );

      setExamples(loadedExamples);
    };

    loadExamples();
  }, []);

  const handleRun = () => {
    let result: string;
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

  return (
    <div>
      <CssBaseline />
      <Navbar />
      <ExamplesSection
        examples={examples}
        onSelectExample={(exampleCode) => setCode(exampleCode)}
      />
      <MainArea
        code={code}
        output={output}
        onCodeChange={setCode}
        onRun={handleRun}
        setMode={setMode}
      />
    </div>
  );
}

export default App;
