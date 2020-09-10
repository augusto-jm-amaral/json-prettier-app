import React, { useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { format } from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import Toastify from 'toastify-js'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import './App.css'
import 'toastify-js/src/toastify.css'

require('codemirror/mode/javascript/javascript');

let instance

function App(props) {
  const [text, setText] = useState('')

  return <div className="wrapper">
    <CodeMirror
      editorDidMount={editor => {

        instance = editor
      }}
      onChange={(editor, data, value) => {
        setText(value)
      }}
      className="CodeMirror"
      options={{
        mode: { name: "javascript", json: true },
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

            instance.setValue(newText)
          } catch (e) {
            console.error(e)

            Toastify({
              text: "Invalid JSON",
              duration: 3000,
              newWindow: true,
              gravity: "top", // `top` or `bottom`
              position: 'right', // `left`, `center` or `right`
              backgroundColor: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
              stopOnFocus: true, // Prevents dismissing of toast on hover
            }).showToast();
          }
        }}
      >
        <span>Prettify</span>
      </a>
    </div>
  </div>
}

export default App;
