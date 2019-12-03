import { parse as nodeParse, HTMLElement, TextNode } from 'node-html-parser';

export type TParse = (TextNode & {
    valid: boolean;
}) | (HTMLElement & {
    valid: boolean;
})

const parse = (rawHtml: string): TParse => {
    const parsedHtml = nodeParse(rawHtml);

    if (!parsedHtml.valid) {
        throw new Error('Html is not valid');
    }

    return parsedHtml;
}

export default { parse }