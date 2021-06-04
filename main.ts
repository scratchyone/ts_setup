import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import Mustache from 'mustache';
import child_process from 'child_process';

(async () => {
  const default_name = path.basename(process.cwd());
  const { project_name } = await inquirer.prompt([
    {
      type: 'input',
      message: 'Project name?',
      name: 'project_name',
      default: default_name,
    },
  ]);
  for (const templateName of fs.readdirSync(__dirname + '/templates')) {
    console.log('Creating ' + templateName);
    const template = fs
      .readFileSync(__dirname + '/templates/' + templateName)
      .toString();
    fs.writeFileSync(templateName, Mustache.render(template, { project_name }));
  }
  console.log('Installing...');
  child_process.exec('npm install');
})();
