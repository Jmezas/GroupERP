import * as winston from "winston";
const logstash = require("winston-logstash-transport");
export class Logger {
  transports: any[] = [];
  static instance: any;
  private logger: winston.Logger;
  MESSAGE = Symbol.for("message");
  LEVEL=Symbol.for("level");

  constructor() {
    this.errorFormartter=this.errorFormartter.bind(this);
    this.erroToLog=this.erroToLog.bind(this);
    this.createTagged=this.createTagged.bind(this);
    this.create=this.create.bind(this);
  }
  static getLogger(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
      Logger.instance
      .addTransport(Transport.Console)
      .addTransport(Transport.ekl)
      .create(); 
    }
    return Logger.instance.logger;
  }
  addTransport(transport: any) {
    this.transports.push(transport);
    return this;
  }
  create() {
    const logger: any = winston.createLogger({
      level: "info",
      transports: this.transports,
      format: winston.format.combine(
        winston.format(this.errorFormartter)(),
        winston.format(this.createTagged)()),
    });
    logger.stream = {
      write: (message: any) => {
        logger.http(message);
      },
    };

    this.logger = logger;
  }
  createTagged(logEntry: any) {
    const tag = {
      env: "dev",
    };
    const taggedLog = Object.assign(tag, logEntry);
    logEntry[this.MESSAGE] = JSON.stringify(taggedLog);
    return logEntry;
  }

  erroToLog(logEntry: any) {
    
     const formatted:any = {
      message: null,
      level:"error"
     }
     formatted[this.LEVEL]="error";
     if(logEntry.message){
      formatted[this.MESSAGE]=`${logEntry.message}: ${logEntry.stack}`;
     }else{
      formatted[this.MESSAGE]=logEntry.stack;
     }
      return formatted;

  }
  errorFormartter(logEntry: any) { 
    if (logEntry instanceof Error) {
      return this.erroToLog(logEntry);
    }
    if (logEntry.stack) {
      logEntry.message = `${logEntry.message}: ${logEntry.stack}`;
    }
    if (logEntry.message?.err instanceof Error) {
      return this.erroToLog(logEntry.message.err);
    }

    logEntry.message = JSON.stringify(logEntry.message);
    return logEntry;
  }
}

export class Transport {
  static get Console() {
    return new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.cli({
          colors: {
            error: "red",
            warn: "yellow",
            info: "green",
            verbose: "cyan",
            debug: "blue",
            silly: "magenta",
            http: "magenta",
          },
        })
      ),
      handleExceptions: true,
    });
  }
  static get ekl() {
    return new logstash.LogstashTransport({
      host: "localhost",
      port: 1514,
    });
  }
}
