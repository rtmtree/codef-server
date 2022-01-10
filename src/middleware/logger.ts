export enum SeverityLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

const formatLog = (message: string, severity: SeverityLevel) => {
  const log = {
    type: "app",
    service: "codef-server",
    severity,
    message,
  };

  return log;
};

export const errorToObject = (error: Error): Record<string, unknown> => ({
  message: error.message,
  stack: error.stack,
});

export const logInfo = (message: string): void => {
  const formattedLog = formatLog(message, SeverityLevel.INFO);
  // eslint-disable-next-line no-console
  console.info(JSON.stringify(formattedLog));
};

export const logWarn = (message: string): void => {
  const formattedLog = formatLog(message, SeverityLevel.WARN);
  // eslint-disable-next-line no-console
  console.warn(JSON.stringify(formattedLog));
};

export const logError = (message: string): void => {
  const formattedLog = formatLog(message, SeverityLevel.ERROR);
  // eslint-disable-next-line no-console
  console.error(JSON.stringify(formattedLog));
};
