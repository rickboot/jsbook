import { useEffect, useRef } from 'react';
import './Preview.css';

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

interface PreviewProps {
  code: string;
}

function Preview({ code }: PreviewProps) {
  const iFrame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    iFrame.current?.contentWindow?.postMessage(code, '*');
  }, [code]);

  return (
    <div className='preview'>
      <iframe
        style={{ height: '100%', width: '100%' }}
        title='preview'
        ref={iFrame}
        sandbox='allow-scripts'
        srcDoc={html}
      />
    </div>
  );
}

export default Preview;
