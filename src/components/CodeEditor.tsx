import { useRef } from 'react';
import prettier from 'prettier/standalone';
import * as prettierPluginBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string | undefined): void;
}

const CodeEditor = ({ initialValue, onChange }: CodeEditorProps) => {
  const editorRef = useRef<any>();

  function onEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    editor.focus();
  }

  async function onFormatClick() {
    const unformatted = editorRef.current.getValue();
    const formatted = await prettier.format(unformatted, {
      parser: 'babel',
      plugins: [prettierPluginBabel, prettierPluginEstree],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    editorRef.current.setValue(formatted);
  }

  return (
    <div className='relative editor-wrapper'>
      <button
        className='button-format button is-primary is-small'
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        onMount={onEditorDidMount}
        defaultValue={initialValue}
        onChange={onChange}
        height='100%'
        theme='vs-dark'
        language='javascript'
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap: 'on',
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
