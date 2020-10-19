import React, { useState, useEffect } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { format } from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import Toastify from "toastify-js";
import Clipboard from 'clipboard'

import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "./App.css";
import "toastify-js/src/toastify.css";
import Icon from "./components/Icon/Icon";

require("codemirror/mode/javascript/javascript");

let instance;
const GITHUB_REPOSITORY =
  "https://github.com/augusto-jm-amaral/json-prettier-app";

function App(props) {
  const [text, setText] = useState("");

  useEffect(() => {
    const clipboard = new Clipboard(".copyButton", {
      text: () => text,
    })
    return () => clipboard.destroy()
  }, [text])

  return (
    <div className="wrapper">
      <CodeMirror
        editorDidMount={(editor) => {
          instance = editor;
        }}
        onChange={(editor, data, value) => {
          setText(value);
        }}
        className="CodeMirror"
        options={{
          mode: { name: "javascript", json: true },
          theme: "dracula",
          lineNumbers: true,
          viewportMargin: Infinity,
        }}
      />
      <div className="iconsContainer">
        <a href={GITHUB_REPOSITORY} target="_blanck">
          <Icon icon={["fab", "github"]} size="lg" color="#fff" />
        </a>
      </div>
      <div className="button-container">
        <a /* eslint-disable-line */
          href="#"
          className="btn"
          onClick={() => {
            try {
              const newText = format(text, {
                parser: "json",
                printWidth: 0,
                trailingComma: "all",
                plugins: [parserBabel],
              });

              instance.setValue(newText);
            } catch (e) {
              console.error(e);

              Toastify({
                text: "Invalid JSON",
                duration: 3000,
                newWindow: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor:
                  "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
                stopOnFocus: true, // Prevents dismissing of toast on hover
              }).showToast();
            }
          }}
        >
          <span>Prettify</span>
        </a>
        <a /* eslint-disable-line */ href='#' className='copyButton btn' onClick={() => {
          Toastify({
            text: "Copied",
            duration: 3000,
            newWindow: true,
            gravity: "top", // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
            stopOnFocus: true, // Prevents dismissing of toast on hover
          }).showToast();
        }}>
          <span>Copy JSON</span>
        </a>
      </div>
    </div >
  );
}

export default App;
