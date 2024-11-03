import { exec } from "child_process";


function executeCommand(...commands: string[]): Promise<string | void> {
  if (commands.length === 0) {
    return Promise.resolve();
  }

  const commandPromises = commands.map((command) => {
    return new Promise<string>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          return reject(new Error(`Error occurred while executing the command: ${command} - ${error.message}`));
        }
        if (stderr) {
          return reject(new Error(`Error occurred while executing the command: ${stderr}`));
        }
        resolve(stdout);
      });
    });
  });

  return Promise.all(commandPromises)
    .then((results) => results.join('\n')) 
    .catch((err) => {
      throw err; 
    });
}

export default {
  executeCommand
}