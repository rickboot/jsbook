import { useEffect, useRef } from 'react';
import './Preview.css';

const html = `
<html>
  <body>
  <head></head>
    <div id='root'></div>
    <script>
      const handleError = (err) => {
        const root = document.getElementById('root');
        root.innerHTML = '<div style="color: red"><h4>Error</h4>' + err + '</div>';
        console.error(err);
      };
      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false);
    </script>
  </body>
</html>`;

interface PreviewProps {
  code: string;
  err: string;
}

function Preview({ code, err }: PreviewProps) {
  const iFrame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setTimeout(() => {
      iFrame.current?.contentWindow?.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe
        style={{ height: '100%', width: '100%' }}
        title='preview'
        ref={iFrame}
        sandbox='allow-scripts'
        srcDoc={html}
      />
      {err !== '' && <div>Error: {err}</div>}
    </div>
  );
}

export default Preview;
