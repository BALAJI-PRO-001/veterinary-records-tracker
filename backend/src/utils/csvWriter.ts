import { createObjectCsvWriter } from "csv-writer";
import { access, mkdir, writeFile } from "fs/promises";
import path from "path";

async function writeRecords(config: {distFilePath: string, csvHeader: Array<Object>}, records: Array<Object>): Promise<Error | void> {
  if (!config.distFilePath || !config.csvHeader) {
    throw new Error("DistFilePath or CsvHeader are null or undefined");
  }

  if (!records) {
    throw new Error("Records is null or undefined");
  }

  try {
    await access(config.distFilePath);
  } catch(err) {
    await mkdir(path.dirname(config.distFilePath), {recursive: true});
    await writeFile(config.distFilePath, "");

    const csvWriter = createObjectCsvWriter({
      path: config.distFilePath,
      header: config.csvHeader as any
    });
  
    await csvWriter.writeRecords(records);
  }
}

export default {
  writeRecords
}