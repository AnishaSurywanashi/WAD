// Script.js - Test JavaScript File

console.log('JS file loaded successfully');

// Show alert when page loads
window.addEventListener('load', function() {
  alert('Welcome! The JavaScript file has been loaded successfully from the static web server.');
});

// Additional console messages
console.log('Current time: ' + new Date().toLocaleString());
console.log('Page URL: ' + window.location.href);
console.log('User Agent: ' + navigator.userAgent);

// Function to test server
function testServer() {
  console.log('Server is working! JavaScript is executing properly.');
}

// Call test function
testServer();
