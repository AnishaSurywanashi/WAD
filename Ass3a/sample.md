# Sample Markdown File

This is for testing the static server.

## Features

The static Node.js web server supports serving multiple file types:

- **HTML files** - Web pages with full styling support
- **CSS files** - Stylesheet for page styling
- **JavaScript files** - Client-side scripting
- **JSON files** - Data interchange format
- **Text files** - Plain text content
- **Image files** - PNG, JPG, SVG formats
- **Document files** - PDF, DOC formats
- **Media files** - MP3, WAV audio formats
- **Font files** - TTF, EOT font files

## Security Features

The server implements important security measures:

1. **Directory Traversal Prevention** - Cannot access files outside the current directory
2. **Path Normalization** - Removes `../` patterns from requests
3. **File Type Validation** - Only serves actual files, not directories
4. **Error Handling** - Returns appropriate HTTP status codes (404, 500)
5. **HTML Escaping** - Prevents XSS attacks in file listings

## Testing the Server

1. Navigate to `http://localhost:1800` in your browser
2. View the list of available files
3. Click any file to serve it in the browser
4. Check browser console for JavaScript messages
5. Monitor server output for request logs

## How It Works

- **Synchronous Directory Listing** - Uses `fs.readdirSync()` to list files
- **Asynchronous File Reading** - Uses `fs.readFile()` for serving content
- **MIME Type Mapping** - Automatically sets correct Content-Type header
- **Port 1800** - Server listens on localhost:1800

Enjoy testing!
