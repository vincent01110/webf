import fs from "fs";
import path from 'path';

const logDirectory = "api/log"

function manageLogFiles() {
    const currentDate = new Date();
    const logFileName = `${currentDate.toISOString().slice(0, 10)}.log`;
    const logFilePath = path.join(logDirectory, logFileName);
  
    // Create a new log file if it doesn't exist
    if (!fs.existsSync(logFilePath)) {
      fs.writeFileSync(logFilePath, '');
    }
  
    // Delete log files older than 3 days
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3);
  
    fs.readdirSync(logDirectory).forEach((file) => {
      const filePath = path.join(logDirectory, file);
      const fileStat = fs.statSync(filePath);
  
      if (fileStat.isFile() && fileStat.mtime < threeDaysAgo) {
        fs.unlinkSync(filePath);
        console.log(`Deleted old log file: ${file}`);
      }
    });
  
    return logFilePath;
  }


export function writeToLogFile(logMessage) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp}: ${logMessage}\n`;
    const logFile = manageLogFiles();
    fs.appendFile(logFile, logEntry, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
  }