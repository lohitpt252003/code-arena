import React, { useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import Layout from '../Layout/Layout';

const EditorComponent = () => {
    
    // Boilerplate code for each language
    const boilerplates = {
        python: `# Python Boilerplate
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
        java: `// Java Boilerplate
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
        cpp: `// C++ Boilerplate
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
        c: `// C Boilerplate
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
        javascript: `// JavaScript Boilerplate
console.log("Hello, World!");`,
    };

    const [code, setCode] = useState(boilerplates['python']); // State to store user's code
    const [output, setOutput] = useState(''); // State to store code execution output
    const [language, setLanguage] = useState('python'); // State to store selected language
    const [fontSize, setFontSize] = useState(14); // State to store font size
    const [input, setInput] = useState(''); // State to store custom input


    // Handle code execution
    const handleRunCode = async () => {
        try {
            const response = await axios.get('http://localhost:5000/execute', {
                params: {
                    "code": code,
                    "language": language,
                    "input": input,
                }
            });
            console.log(input);
            console.log(code);
            console.log(language);
            
            console.log(response);
            
            setOutput(response.data.stdout || response.data.stderr); // Set the output
        } catch (err) {
            setOutput(`Error: ${err.response?.data?.error || err.message}`);
        }
    };

    // Handle language change
    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        setCode(boilerplates[selectedLanguage]); // Set boilerplate code for the selected language
    };

    // Handle font size change
    const handleFontSizeChange = (e) => {
        setFontSize(Number(e.target.value));
    };

    return (
        <Layout style={{ padding: '20px' }}>
            <h1>Online Code Editor</h1>
            <div style={editorContainerStyle}>
                <div style={controlsStyle}>
                    <div style={controlGroupStyle}>
                        <label>Language: </label>
                        <select value={language} onChange={handleLanguageChange}>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                            <option value="c">C</option>
                            <option value="javascript">JavaScript</option>
                        </select>
                    </div>
                    <div style={controlGroupStyle}>
                        <label>Font Size: </label>
                        <select value={fontSize} onChange={handleFontSizeChange}>
                            <option value={12}>12px</option>
                            <option value={14}>14px</option>
                            <option value={16}>16px</option>
                            <option value={18}>18px</option>
                            <option value={20}>20px</option>
                        </select>
                    </div>
                </div>
                <Editor
                    height="400px"
                    width="100%"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value)}
                    options={{ fontSize: fontSize }}
                />
                <div style={inputContainerStyle}>
                    <label>Custom Input: </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={4}
                        style={{ width: '100%', marginTop: '10px' }}
                    />
                </div>
                <button onClick={handleRunCode} style={runButtonStyle}>Run Code</button>
                <div style={outputContainerStyle}>
                    <h3>Output:</h3>
                    <pre style={outputStyle}>{output}</pre>
                </div>
            </div>
        </Layout>
    );
};

// Styles for the editor container
const editorContainerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
};

// Styles for the controls
const controlsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
};

// Styles for each control group
const controlGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
};

// Styles for the input container
const inputContainerStyle = {
    marginTop: '10px',
};

// Styles for the run button
const runButtonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

// Styles for the output container
const outputContainerStyle = {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f4f4f4',
    border: '1px solid #ddd',
    borderRadius: '5px',
};

// Styles for the output text
const outputStyle = {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
};

export default EditorComponent;