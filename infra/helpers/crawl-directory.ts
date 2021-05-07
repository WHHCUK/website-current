import * as fs from 'fs';

function crawlDirectory(dir: string, f: (_: string) => void) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = `${dir}/${file}`;
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      crawlDirectory(filePath, f);
    }

    if (stat.isFile()) {
      f(filePath);
    }
  }
}

export default crawlDirectory;