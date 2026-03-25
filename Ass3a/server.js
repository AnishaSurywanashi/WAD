const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Configuration
const PORT = 1800;
const BASE_DIR = __dirname; // Use the directory where server.js is located

// MIME type mapping for common web, media, and document files.
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

/**
 * Escape HTML special characters to prevent XSS attacks.
 * @param {string} value - The string to escape
 * @returns {string} Escaped string safe for HTML
 */
function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Get MIME type based on file extension.
 * Defaults to 'application/octet-stream' for unknown types.
 * @param {string} filePath - Path to the file
 * @returns {string} MIME type
 */
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

/**
 * Send an HTML response with status code and body.
 * @param {object} res - HTTP response object
 * @param {number} statusCode - HTTP status code
 * @param {string} html - HTML content
 */
function sendHtml(res, statusCode, html) {
  res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

/**
 * Build the homepage HTML with a list of files in the current directory.
 * Uses synchronous file listing as per requirements.
 * @returns {string} HTML page content
 */
function buildHomePage() {
  // Synchronously read all entries in the base directory.
  const allEntries = fs.readdirSync(BASE_DIR);

  // Filter to include only files (not directories).
  const fileNames = allEntries.filter((entry) => {
    const fullPath = path.join(BASE_DIR, entry);
    try {
      return fs.existsSync(fullPath) && fs.statSync(fullPath).isFile();
    } catch {
      return false;
    }
  });

  // Build HTML list items with safe URLs and escaped names.
  const listItems = fileNames
    .map((fileName) => {
      // Encode the file name for safe URL parameter.
      const href = '/?file=' + encodeURIComponent(fileName);
      // Escape HTML to prevent injection.
      return `<li><a href="${href}">${escapeHtml(fileName)}</a></li>`;
    })
    .join('');

  // Return complete HTML page.
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>List of files</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }
    h1 {
      color: #333;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin: 0.5rem 0;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>List of files</h1>
  <ul>
    ${listItems || '<li>No files found in current directory.</li>'}
  </ul>
</body>
</html>`;
}

/**
 * Sanitize the requested file path to prevent directory traversal attacks.
 * - Decodes URL encoding
 * - Normalizes slashes
 * - Removes ../ patterns
 * - Removes leading slashes
 * @param {string} requestedFile - The file name from the request
 * @returns {string} Safe relative file path
 */
function sanitizeRequestedFile(requestedFile) {
  // Decode URL-encoded characters (e.g., %20 for spaces).
  const decoded = decodeURIComponent(requestedFile || '');

  // Normalize path separators (convert backslashes to forward slashes on Windows).
  let normalized = path.normalize(decoded).replace(/\\/g, '/');

  // Remove all ../ patterns to prevent directory traversal.
  normalized = normalized.replace(/\.\.\//g, '');

  // Remove leading slashes so path.join keeps relative to BASE_DIR.
  normalized = normalized.replace(/^\/+/, '');

  return normalized;
}

/**
 * Create the HTTP server and define request handling.
 */
const server = http.createServer((req, res) => {
  // Parse the request URL and query parameters.
  const parsedUrl = url.parse(req.url, true);

  // Handle root URL without file parameter - show file list.
  if (parsedUrl.pathname === '/' && !parsedUrl.query.file) {
    try {
      const html = buildHomePage();
      sendHtml(res, 200, html);
    } catch (err) {
      // Send generic error for any exception during file listing.
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal Server Error');
    }
    return;
  }

  // Extract requested file name from query parameter.
  const requestedFile = parsedUrl.query.file;
  if (!requestedFile) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('File not found');
    return;
  }

  // Sanitize the file path to prevent attacks.
  const safeRelativePath = sanitizeRequestedFile(requestedFile);
  const finalPath = path.resolve(BASE_DIR, safeRelativePath);

  // Extra security check: ensure final path stays within BASE_DIR.
  const resolvedBase = path.resolve(BASE_DIR);
  if (
    !finalPath.startsWith(resolvedBase + path.sep) &&
    finalPath !== resolvedBase
  ) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Access denied');
    return;
  }

  // Check if the requested path exists and is actually a file (not directory).
  if (!fs.existsSync(finalPath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('File not found');
    return;
  }

  if (!fs.statSync(finalPath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('File not found');
    return;
  }

  // Determine the correct MIME type based on file extension.
  const contentType = getContentType(finalPath);

  // Asynchronously read the file as per requirements.
  fs.readFile(finalPath, (err, data) => {
    if (err) {
      // Send 500 error if file reading fails.
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal Server Error');
      return;
    }

    // Send file content with correct Content-Type header.
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// Start the server on PORT 1800.
server.listen(PORT, () => {
  console.log(`✓ Server is running at http://localhost:${PORT}`);
  console.log(`✓ Serving files from: ${BASE_DIR}`);
  console.log(`✓ Press Ctrl+C to stop the server`);
});
