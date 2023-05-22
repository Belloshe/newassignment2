import chalk from 'chalk';
import fs from 'fs/promises';
import { formatDistanceToNow, isAfter, isBefore, parse, format, isToday, set } from 'date-fns';
import { Command } from 'commander';
import getGitVersion from './src/getGitVersion.js';
import { version } from 'node:process';

const gitVersion = await getGitVersion()
console.log(`Git version: ${gitVersion}`);
console.log(`npm / node: ${process.env.npm_config_user_agent}`);
console.log(`another way to show node version: ${version}`);

const first = 'bella'
const last = 'Ibrahimsson'
const name = `${chalk.magenta(first)} ${chalk.magenta(last)}`
console.log('name', name)

let argumentParser = new Command();
argumentParser.option('--date');
argumentParser.parse();

let inputDateString = argumentParser.args[0];
let inputDate = parse(inputDateString, 'yyyy-MM-dd', new Date());
let currentDate = set(new Date(), {hours: 0, minutes: 0, seconds: 0, milliseconds: 0});
const formattedDate = format(currentDate, 'yyyy-MM-dd');

let startOfCourse = new Date(2023, 0, 31);
let daysFromCourseStart = formatDistanceToNow(startOfCourse);
console.log('SinceCourseStart: ',daysFromCourseStart);

console.log('current day is: ', formattedDate);
console.log('IsToday():', isToday(currentDate))
console.log('Input is after currentday:', isAfter(inputDate, currentDate))
console.log('Input is before currentday:', isBefore(inputDate, currentDate))

const fileContent = `
### myName: ${first} ${last}
### ${process.env.npm_config_user_agent ? `nodeVerison: ${process.env.npm_config_user_agent}` :
version ? `nodeVerison: ${version}` : ''}
### gitVersion: ${gitVersion}
### currentDate is: ${currentDate}
### inputDate is: ${inputDate}
### daysFromCourseStart is: ${daysFromCourseStart}
`;

await fs.writeFile('index.md', fileContent);

// console.log(formatDistanceToNow(startOfCourse, { addSuffix: true }));

const htmlContent = `<!DOCTYPE html>
<html lang="en">

<head>
  <title>Uppgift 2</title> 
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <header>
  <h1>Uppgift 2</h1>
  </header>
  <main>
    <div className='container'>
      <p>Name: ${first} ${last}</p>
      <p>nodeVerison: ${version}</p>
      <p>gitVersion: ${gitVersion}</p>
      <p>daysFromCourseStart: ${daysFromCourseStart}</p>
      <p>currentDate is: ${currentDate}</p>
      <p>inputDate is: ${inputDate}</p>
    </div>
  </main>
</body>

</html>`;
await fs.writeFile('index.html', htmlContent);