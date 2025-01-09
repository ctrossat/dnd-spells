import { remark } from 'remark';
import html from 'remark-html';

export default async function toHTML (md) {
    const processedContent = await remark()
        .use(html)
        .process(md);

    return processedContent;
}