class CustomLogger {
  log(...args: any) {
    console.log(...args);
  }

  info(...args: any) {
    console.info(...args);
  }

  error(...args: any) {
    console.error(...args);
  }

  group(...args: any) {
    console.group(...args);
  }

  groupEnd() {
    console.groupEnd();
  }
}

export const Logger = new CustomLogger();
