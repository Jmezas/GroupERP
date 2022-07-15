import * as winston from "winston";

export class Logger {
  transports: any[] = [];
  static instance: any;
  private logger: winston.Logger;
  MESSAGE=Symbol.for("message")
  constructor() {}
  static getLogger(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
      Logger.instance.addTransport(Transport.Console).create();
    }
    return Logger.instance.logger;
  }
  addTransport(transport: any) {
    this.transports.push(transport);
    return this;
  }
  create() {
    const Logger = winston.createLogger({
      level: "info",
      transports: this.transports,
      format: winston.format.combine(winston.format(this.createTagged)()),
    });
    this.logger = Logger;
  }
  createTagged(logEntry: any) {
    const tag = {
      env: "dev",
    };
    const taggedLog = Object.assign(tag, logEntry);
    logEntry["message"] = JSON.stringify(taggedLog);
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
}
