import program from 'commander';
import fetch from 'node-fetch';
import { parse, HTMLElement, TextNode } from 'node-html-parser';

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

    return parsedHtml;
}

const getCountByTag = (
    html: HTMLElement | TextNode,
    analysedData: { [name: string]: number } = {}
) => {
    if (html instanceof HTMLElement && html.tagName !== null) {
        const { tagName } = html;

        if (!analysedData[tagName]) {
            analysedData[tagName] = 0;
        }
        analysedData[tagName] = analysedData[tagName] + 1;
    }

    html.childNodes.forEach((item) =>
        getCountByTag(item as HTMLElement | TextNode, analysedData)
    );

    return analysedData;
}

const extractMostCommonTag = (tagsCount: any) => Object.keys(tagsCount).reduce(
    (prev, current) => (tagsCount[prev] > tagsCount[current]) ? prev : current
);

const extractPaths = (html: HTMLElement | TextNode, path: string = '', results: { [name: string]: number } = {}) => {
    if (html instanceof HTMLElement && html.tagName !== null) {
        path = `${path}/${html.tagName}`;

        if (!results[path]) {
            results[path] = 0;
        }

        results[path] = results[path] + 1;
    }

    html.childNodes.forEach((item) =>
        extractPaths(item as HTMLElement | TextNode, path, results)
    );

    return results;
}

const extractMostCommonTagLongestPath = (pathesCounts: { [name: string]: number }, mostCommonTag: string) => {
    const mostCommonTagPathes = Object.keys(pathesCounts).filter(path => path.endsWith(`/${mostCommonTag}`));
    const longestPath = mostCommonTagPathes.reduce((prev, current) => {
        const prevDepth = prev.split('/').length;
        const currentDepth = current.split('/').length

        return (prevDepth > currentDepth || (prevDepth === currentDepth && pathesCounts[prev] > pathesCounts[current])) ? prev : current;
    });

    return {
        [longestPath]: pathesCounts[longestPath]
    };
}

(async () => {
    const parsedHtml = await fetchAndParseHtml(program.source);
    const tagsCount = getCountByTag(parsedHtml);
    const allPathesCounts = extractPaths(parsedHtml);
    const mostCommonTag = extractMostCommonTag(tagsCount)
    const longestMostCommonTagPath = extractMostCommonTagLongestPath(allPathesCounts, mostCommonTag);

    const result = {
        uniqueTags: Object.keys(tagsCount),
        mostCommonTag,
        longestMostCommonTagPath: longestMostCommonTagPath,
    }

    console.log(result);
})()

