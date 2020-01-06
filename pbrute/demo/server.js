const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css'
};

const root = path.resolve(__dirname, './');

const files = {};

// Read a file and memoize the result
function readFile(path) {
  if (files[path])
    return Promise.resolve(files[path]);

  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, content) => {
      if (error)
        return reject(error);

      resolve(content);
    });
  });
}

// Log a request in a format similar to CLF
function log(request, path) {
  const now = new Date();
  const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}:${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  console.log(`${request.connection.remoteAddress} - - [${date}] "${request.method} ${request.url} HTTP/${request.httpVersion}" -> ${path}`);
}

// Respond with 404 - file not found
async function handle404(request, response) {
  response.writeHead(404);
  const content = await readFile(path.resolve(__dirname, './errors/404.html'));
  response.end(content);
}

// Respond with 400 - bad request
async function handle400(request, response) {
  response.writeHead(400);
  const content = await readFile(path.resolve(__dirname, './errors/400.html'));
  response.end(content);
}

async function handleRequest(request, response) {
  // Only handle GET
  if (request.method !== 'GET')
    return handle400(request, response);

  let filePath = root + request.url;

  // Ensure that '/' is handled as '/index.html'
  if (filePath === `${root}/`)
    filePath = './index.html';

  const extension = path.extname(filePath).toLowerCase();

  // Resolve path to mitigate path traverals
  filePath = path.resolve(__dirname, filePath);
  log(request, filePath);

  // Wanted path is outside of web root
  if (filePath.indexOf(root) !== 0)
    return handle404(request, response);

  // Don't allow fetching the server itself
  if (filePath === path.resolve(__dirname, './server.js'))
    return handle404(request, response);

  // Don't allow fetching error pages directly
  if (filePath.indexOf(path.resolve(__dirname, './errors')) === 0)
    return handle404(request, response);

  try {
    const content = await readFile(filePath);

    // Respond with the file
    const contentType = mimeTypes[extension] || 'application/octet-stream';
    response.writeHead(200, {'Content-Type': contentType});
    response.end(content, 'utf-8');
  } catch (error) {
    console.log(error);
    handle404(request, response);
  }
}

const server = http.createServer(handleRequest);

process.on('SIGINT', () => {
  process.exit();
});

server.listen(3000);
console.log('Listening on :3000');
