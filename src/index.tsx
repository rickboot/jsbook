import * as esbuild from 'esbuild-wasm';
import { createRoot } from 'react-dom/client';
import { useEffect, useRef, useState } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const iFrame = useRef<HTMLIFrameElement>(null);

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
    return () => ref.current.stop();
  }, []);

  const onClick = async () => {
    if (!ref.current) return;

    // reset iframe content
    if (!iFrame.current) return;
    iFrame.current.srcdoc = html;

    // esbuild translate and bundle
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    const code = result.outputFiles[0].text;
    iFrame.current?.contentWindow?.postMessage(code, '*');
  };

  const html = `
  <html>
    <body>
    <head></head>
      <div id='root'></div>
      <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            const root = document.getElementById('root');
            root.innerHTML = '<div style="color: red"><h4>Error</h4>' + err + '</div>';
            console.error(err);
          }
        }, false);
      </script>
    </body>
  </html>`;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        name=''
        id=''
        cols={30}
        rows={10}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{html}</pre>
      <iframe
        title='preview'
        ref={iFrame}
        sandbox='allow-scripts'
        srcDoc={html}
      />
    </div>
  );
};

const root = createRoot(document.getElementById('root') as Element);
root.render(<App />);
