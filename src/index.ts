import program from 'commander';
import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';

program
  .version('1.0.0')
  .description("Webpage analysis tool")
  .requiredOption('-src, --source <source>', 'source of webpage');

program.parse(process.argv);

const fetchHtml = async (url: string) => {
    const response = await fetch(url);
    const content = await response.text();

    return content;
}

const fetchAndParseHtml = async (url: string) => {
    const html = await fetchHtml(url);

    const parsedHtml = parse(html);
    if (parsedHtml instanceof HTMLElement) {
        // TODO: iterate through child nodes and 
        console.log(parsedHtml)
    }
}

fetchAndParseHtml(program.source);

