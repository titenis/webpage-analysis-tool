
import { HTMLElement } from "node-html-parser";
import { TParse } from "./htmlParser";

const isValidHtml = (html: TParse) => (html as HTMLElement).tagName !== undefined && (html as HTMLElement).tagName !== null;

export interface IAnalysedData {
  [name: string]: number;
}
const getCountByTag = (
  html: TParse,
  analysedData: IAnalysedData = {}
): IAnalysedData => {
  if (isValidHtml(html)) {
    const { tagName } = html as HTMLElement;

    if (!analysedData[tagName]) {
      analysedData[tagName] = 0;
    }
    analysedData[tagName] = analysedData[tagName] + 1;
  }

  html.childNodes.forEach(item => getCountByTag(item as TParse, analysedData));

  return analysedData;
};

const extractMostCommonTag = (tagsCount: IAnalysedData): string =>
  Object.keys(tagsCount).reduce((prev: string, current: string) =>
    tagsCount[prev] > tagsCount[current] ? prev : current
  );

export interface IExtractedPaths {
  [name: string]: number;
}
const extractPaths = (
  html: TParse,
  path: string = '',
  results: IExtractedPaths = {}
): IExtractedPaths => {
  if (isValidHtml(html)) {
    const { tagName } = html as HTMLElement;

    path = `${path}/${tagName}`;

    if (!results[path]) {
      results[path] = 0;
    }

    results[path] = results[path] + 1;
  }

  html.childNodes.forEach(item => extractPaths(item as TParse, path, results));

  return results;
};

export interface IMostCommonTagLongestPath {
  [name: string]: number;
}
const extractMostCommonTagLongestPath = (
  pathesCounts: IExtractedPaths,
  mostCommonTag: string
): IMostCommonTagLongestPath => {
  const mostCommonTagPathes = Object.keys(pathesCounts).filter(path =>
    path.endsWith(`/${mostCommonTag}`)
  );
  const longestPath = mostCommonTagPathes.reduce((prev, current) => {
    const prevDepth = prev.split('/').length;
    const currentDepth = current.split('/').length;

    return prevDepth > currentDepth ||
      (prevDepth === currentDepth && pathesCounts[prev] > pathesCounts[current])
      ? prev
      : current;
  });

  return {
    [longestPath]: pathesCounts[longestPath]
  };
};
export default {
  getCountByTag,
  extractMostCommonTag,
  extractPaths,
  extractMostCommonTagLongestPath
};
