export default ({ markup, css }) => {
  return `<!doctype html>
      <html lang="en">
          <head>
             <meta charset="utf-8">
             <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
             <title>MERN Skeleton</title>
          </head>
          <body>
            <div id="root">${markup}</div>
            <style id="jss-server-side">${css}</style>
            <script type="text/javascript" src="/dist/bundle.js"></script>
          </body>
      </html>`;
};
