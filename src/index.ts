import program from 'commander';

import htmlFetcher from './tools/htmlFetcher';
import htmlParser from './tools/htmlParser';
import htmlAnalyser from './tools/htmlAnalyser';

program
    .version('1.0.0')
    .description("Webpage analysis tool")
    .command('analyse <source>')
    .action(async (source: string) => {
        try {
            const fetchedHtml = await htmlFetcher.fetch(source);
            const parsedHtml = htmlParser.parse(fetchedHtml);
            const tagsCount = htmlAnalyser.getCountByTag(parsedHtml);
            const allPathesCounts = htmlAnalyser.extractPaths(parsedHtml);
            const mostCommonTag = htmlAnalyser.extractMostCommonTag(tagsCount)
            const longestMostCommonTagPath = htmlAnalyser.extractMostCommonTagLongestPath(allPathesCounts, mostCommonTag);
    
            const result = {
                uniqueTags: Object.keys(tagsCount),
                mostCommonTag,
                longestMostCommonTagPath,
            }
    
            console.log(result);
        } catch ({ message }) {
            console.log(`Error: ${message}`);
        }
      })
    ;

program.parse(process.argv);
