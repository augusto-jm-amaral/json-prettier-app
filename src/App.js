import React, { useState } from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import { format } from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import './App.css'

require('codemirror/mode/javascript/javascript');

function App (props) {
    const [text, setText] = useState('')
    // let instance
  
    return <div className="wrapper">
      <CodeMirror
        value={text}
        editorDidMount={editor => { 
          // instance = editor
          // setTimeout(() => {
            // instance.markText(
            //   {line: 0, ch: 0},
            //   {line: 0, ch: 10},
            //   {
            //     css: "color: red",
            //   }
            // )
          // }, 1000)
        }}
        onChange={(editor, data, value) => {
          setText(value)
        }}
        className="CodeMirror"
        options={{
          mode: {name: "javascript", json: true},
          theme: 'dracula',
          lineNumbers: true,
          viewportMargin: Infinity,
        }}
      />
      <div className="button-container">
        <a /* eslint-disable-line */
          href="#"
          className="btn"
          onClick={() => {
            try {
              const newText = format(text, {
                  parser: 'json',
                  printWidth: 0,
                  trailingComma: 'all',
                  plugins: [parserBabel]
                })
    
              setText(newText)
            } catch (e) { 
              console.error(e)
            }
          }}
        >
          <span>Prettify</span>
        </a>
      </div>
    </div>
}

export default App;
