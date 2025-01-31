import React, { useEffect, useState } from 'react';
import { Editor } from "@monaco-editor/react";
import axios from 'axios';
import TestCaseCard from '../TestCaseCard/TestCaseCard';
import executeCode from '../../utils/codeExecution';

function TestCases(props) {
    const [language, setLanguage] = useState("cpp");
    const languageMap = {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Hello, C++!" << endl;\n\treturn 0;\n}`,
      c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, C!\\n");\n\treturn 0;\n}`,
      python: `print("Hello, Python!")`,
      java: `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, Java!");\n\t}\n}`,
      javascript: `console.log("Hello, JavaScript!");`,
    };
    const languages = ["cpp", "c", "python", "java", "javascript"];
    const [boilerplate, setBoilerplate] = useState(languageMap[language]);

    const handleLanguageChange = (lang) => {
      setLanguage(lang);
      setBoilerplate(languageMap[lang]); // Update boilerplate for selected language
    };
    const handleEditorChange = (newValue) => {
      setBoilerplate(newValue);
      // console.log(newValue);
    };

    const [_testcases, set_testcases] = useState([]);
    // let testcases;
    // console.log(props.testcases.visible);
    // console.log(props.testcases.visible.length);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/problems/${props.id}`);
          // console.log(response.data.testcases.visible);
          set_testcases(props.type === 'visible' ? response.data.testcases.visible : response.data.testcases.hidden);
        }
        catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
      // console.log();
      
    }, []);
    
    
    const [runTestCases_message, setRunTestCases_message] = useState(`Run All Testcases`);
    const runTestCase = async (i) => {
      const response = await executeCode(language, boilerplate, _testcases[i].input);
      // console.log(response);
      setRunTestCases_message(`Runninng Testcase ${i + 1}`);
      let element = document.getElementById(`case-${i}`);
      element.innerText = `Actual Output: ${response.output}`;
    }
    

    const runAllTestCases = async () => {
      setRunTestCases_message('Running All Testcases...');
      for (let i = 0; i < _testcases.length; i++) {
        await runTestCase(i);
      }
      setRunTestCases_message('Run All Testcases');
    }

    const [message, setMessage] = useState('');
    const handleSubmit = () => {
      const formData = new FormData();
      formData.append("lang", language);
      formData.append("code", boilerplate);
      axios.post(`/submit/${props.id}`, formData)
       .then(response => {
          console.log(response.data.status);
          if (response.data.status === 'success') {
            setMessage('All cases passed\n')
          }
          else {
            setMessage(`${response.data.message}\ninput: ${response.data.input}\noutput: ${response.data.output}\nexpected_output: ${response.data.expected_output}`);
          }
        })
       .catch(error => {
          console.error("Error submitting code:", error);
        });
    }

    // console.log(actualOutputs);
    
    return (
        <div>
          <h1 id="TestCases-message"><pre>{message}</pre></h1>
            <h2>{props.testCaseType}</h2>
            <button onClick={handleSubmit}>Submit your code</button>
            <button onClick={runAllTestCases}>{runTestCases_message}</button>
            <select
              value={language}
              onChange={(event) => handleLanguageChange(event.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <div id="TestCases-Editor">
              <Editor
                height="50vh"
                language={language} // Correct language binding
                value={boilerplate} // Dynamically set the editor content
                theme="vs-dark"
                options={{
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                }}
                onChange={handleEditorChange}
              />
            </div>

            {
                _testcases.map((_case, i) => 
                <TestCaseCard 
                    index = {i}
                    expectedOutput = {_case.expected_output}
                    input = {_case.input}
                    code = {boilerplate}
                    language = {language}
                    key = {i}
                    id = {`case-${i}`}
                />)
            }
        </div>
    );
}

export default TestCases;