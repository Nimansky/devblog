/* eslint-disable @next/next/no-img-element */
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { promises as fs } from 'fs';
import Link from 'next/link';

export async function generateStaticParams() {  
    const posts = await fs.readdir(process.cwd() + '/src/pages');

    return posts.map((post) => ({
        slug: post.slice(0, post.lastIndexOf('.md'))
    }));
}

export default async function BlogPost({params}: {params: Promise<{slug: string}>}) {

    const postName = (await params).slug;
    const file = await fs.readFile(process.cwd() + '/src/pages/' + postName + '.md', 'utf-8');
    const date = (await fs.stat(process.cwd() + '/src/pages/' + postName + '.md')).mtime;
    
    const lines = file.split('\n');
    //draft information is not used on the actual blog post page (as of yet, maybe there's a use for this info down the line)
    //const draft = Boolean(lines[0].split(':')[1].trim());
    const title = lines[1];
    const content = lines.slice(2).join('\n');

    return (
        <div className="bg-neutral-900 text-white h-screen w-screen overflow-auto">
            <div className="relative top-2 left-4 w-fit">
                <Link href="/">
                    <img src="../img/back-arrow.svg" alt="Back Arrow" className="inline h-10 w-auto " draggable="false"></img>
                </Link>
            </div>
            <div className="h-2/6 w-full flex flex-col items-center justify-center">
                <p className="font-vt323 text-9xl">
                    {title}
                </p>
                <p className="text-base text-gray-500">
                    Published {date.toLocaleDateString('en-us')}
                </p>
            </div>
            <div className="w-7/12 h-fit markdown justify-self-center">
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{content}</Markdown>
            </div>
        </div>
    );
}