import chalk from 'chalk';
import fs from 'fs/promises'
import {formatDistanceToNow, isAfter, isBefore, parse, format, isToday, set} from 'date-fns'
import {Command} from 'commander';
import getGitVersion from './src/getGitVersion.js';

const gitVersion = await getGitVersion()
console.log(`git version: ${gitVersion}`);

const first = 'bella'
const last = 'Ibrahimsson'
const name = `${chalk.magenta(first)} ${chalk.magenta(last)}`

console.log('name', name)

console.log(`npm & node: ${process.env.npm_config_user_agent}`)

const argumentParser = new Command();
argumentParser.option('--date <date>', 'Specify a date in yyyy-MM-dd format');
argumentParser.parse();

const dateStringSentAsArgument = argumentParser.date
const dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date()) 
const currentDate = set(new Date(), {hours: 0, minutes: 0, seconds: 0, milliseconds: 0})

console.log('idag', isToday(dateSentAsArgument))
console.log('imorgon', isAfter(dateSentAsArgument, currentDate))
console.log('förrigår', isBefore(dateSentAsArgument, currentDate))

const compareDates = (date1, date2) => {
  if (isBefore(date1, date2)) {
    return 'before';
  } else if (isAfter(date1, date2)) {
    return 'after';
  } else {
    return 'the same as';
  }
}

const now = new Date();
const formattedDate = chalk.cyanBright(now.toLocaleString());

console.log('Current date and time:', formattedDate);

const fileContent = `
name: ${first} ${last}
npm & node: ${process.env.npm_config_user_agent}
git version: ${gitVersion}
current date and time: ${formattedDate}
date sent as argument: ${dateSentAsArgument}
date sent as argument is ${compareDates(dateSentAsArgument, currentDate)} the current date
`;

await fs.writeFile('index.md', fileContent);

const startOfCourse = new Date(2023, 0, 31)
console.log(formatDistanceToNow(startOfCourse))
