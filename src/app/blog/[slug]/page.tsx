import { Post } from '@/db/schema';
import { run } from '@/db/connect';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export async function generateStaticParams() {  
    await run().catch((error: Error) => console.error('Error connecting to MongoDB', error));
    const posts = await Post.find();

    return posts.map((post) => ({
        slug: post.url
    }));
}

export default async function BlogPost({params}: {params: Promise<{slug: string}>}) {
    await run().catch((error: Error) => console.error('Error connecting to MongoDB', error));

    const url_title = (await params).slug;

    const post = await Post.find().where('url').equals(url_title);

    if(post.length === 0) {
        return <p>
            Post not found
        </p> 
    }

    post[0].content = post[0].content.replace("\\n", '\n').replace('\\"', '"').replace("\\'", "'");

    return <div>
        <p>
            Title: {post[0].title}
        </p>
        <p>
            Published: {post[0].date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric", hour:"numeric", minute:"numeric"})}
        </p>
        <br/>
        <div className="markdown-body w-[80%]">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{post[0].content}</Markdown>
        </div>
    </div>;
}