import htmlAnalyser from '../../tools/htmlAnalyser';
import { HTMLElement } from 'node-html-parser';
import { TParse } from '../../tools/htmlParser';

const html = new HTMLElement('div', {});
const divTag = html.appendChild(new HTMLElement('div', {}));
divTag.appendChild(new HTMLElement('p', {}));
divTag.appendChild(new HTMLElement('i', {}));
const countResult = { div: 2, p: 1, i: 1 };
const extractedPaths = { '/div': 1, '/div/div': 1, '/div/div/p': 1, '/div/div/i': 1 };
const commonTagLongestPath = { '/div/div': 1 };

test('Get count by tag', () => {
    const result = htmlAnalyser.getCountByTag({ ...html, valid: true } as TParse);
    expect(result).toStrictEqual(countResult);
});

test('Extract most common tag', () => {
    const result = htmlAnalyser.extractMostCommonTag(countResult);
    expect(result).toEqual('div');
});

test('Extract paths', () => {
    const result = htmlAnalyser.extractPaths({ ...html, valid: true } as TParse);
    expect(result).toStrictEqual(extractedPaths);
});

test('Extract most common tag longest path', () => {
    const result = htmlAnalyser.extractMostCommonTagLongestPath(extractedPaths, 'div');
    expect(result).toStrictEqual(commonTagLongestPath);
});