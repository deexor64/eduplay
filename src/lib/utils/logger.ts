import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'serverLog');
const MAX_LINES_PER_FILE = 5000; 

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

let currentLogFile = createNewLogFile();
let logCount = 0;

function createNewLogFile(): string {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-'); // for filename safety
  const fileName = `server_${timestamp}.log`;
  logCount = 0;
  return path.join(LOG_DIR, fileName);
}

export default function serverLog(context: string, message: string) {
  
  const now = new Date();
  const timestamp = now.toISOString();

  logCount++;

  // Rotate file if limit reached
  if (logCount > MAX_LINES_PER_FILE) {
    currentLogFile = createNewLogFile();
  }

  const logLine = `${logCount} | ${timestamp} | ${context} | ${message}\n`;

  fs.appendFile(currentLogFile, logLine, (err) => {
    if (err) {
      console.error('Logger failed:', err);
    }
  });
  
}
