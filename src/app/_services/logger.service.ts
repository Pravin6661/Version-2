import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private readonly LOG_LEVELS = {
    ERROR: 1,
    WARNING: 2,
    INFO: 3,
    DEBUG: 4,
  };

  private logLevel: number = this.LOG_LEVELS.DEBUG; // Set the default log level to DEBUG

  constructor() {}

  setLogLevel(logLevel: number) {
    // Set the log level for the logger
    this.logLevel = logLevel;
  }

  private log(message: string, logLevel: number): void {
    if (logLevel <= this.logLevel) {
      switch (logLevel) {
        case this.LOG_LEVELS.ERROR:
          console.error(`[ERROR] ${message}`);
          break;
        case this.LOG_LEVELS.WARNING:
          console.warn(`[WARNING] ${message}`);
          break;
        case this.LOG_LEVELS.INFO:
          console.info(`[INFO] ${message}`);
          break;
        case this.LOG_LEVELS.DEBUG:
          console.log(`[DEBUG] ${message}`);
          break;
        default:
          console.log(message);
      }
    }
  }

  error(message: string): void {
    this.log(message, this.LOG_LEVELS.ERROR);
  }

  warn(message: string): void {
    this.log(message, this.LOG_LEVELS.WARNING);
  }

  info(message: string): void {
    this.log(message, this.LOG_LEVELS.INFO);
  }

  debug(message: string): void {
    this.log(message, this.LOG_LEVELS.DEBUG);
  }
}
