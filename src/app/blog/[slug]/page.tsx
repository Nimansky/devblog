import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { promises as fs } from 'fs';

export async function generateStaticParams() {  
    const posts = await fs.readdir(process.cwd() + '/public/pages');

    return posts.map((post) => ({
        slug: post.slice(0, post.lastIndexOf('.md'))
    }));
}

export default async function BlogPost({params}: {params: Promise<{slug: string}>}) {

    const postName = (await params).slug;
    const file = await fs.readFile(process.cwd() + '/public/pages/' + postName + '.md', 'utf-8');
    
    const lines = file.split('\n');
    const title = lines[0];
    const date = new Date(lines[1]);
    const content = lines.slice(2).join('\n');

    return <div className="flex justify-center items-center flex-col">
        <p>
            Title: {title}
        </p>
        <p>
            Published: {date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric", hour:"numeric", minute:"numeric"})}
        </p>
        <div className="markdown-body w-[80%]">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{content}</Markdown>
        </div>
    </div>;
}