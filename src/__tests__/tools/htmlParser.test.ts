import htmlParser from '../../tools/htmlParser';
import { HTMLElement } from 'node-html-parser';

test('Parse html element', () => {
    expect(() => {
        const htmlNode = htmlParser.parse('<div>html</div>');

        expect(htmlNode instanceof HTMLElement).toBeTruthy();
    }).not.toThrow(Error)
});

test('Throw invalid error', () => {
    expect(() => {
        htmlParser.parse('<div>html</>');
    }).toThrow(Error)
});
