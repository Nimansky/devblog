import { Post } from '../../../db/schema';
import { run } from '../../../db/connect';

export async function generateStaticParams() {  
    await run().catch((error: Error) => console.error('Error connecting to MongoDB', error));
    const posts = await Post.find();
   
    console.log(posts);
    return posts.map((post) => ({
        slug: post.url
    }));
}

export default async function BlogPost({params}: {params: Promise<{slug: string}>}) {
    await run().catch((error: Error) => console.error('Error connecting to MongoDB', error));

    const url_title = (await params).slug;

    const post = await Post.find().where('url').equals(url_title);

    return post.length === 0 ? 
    <p>
        Post not found
    </p> 
        : 
    <div>
        <p>
            Title: {post[0].title}
        </p>
        <br/>
        <p> 
            Content: {post[0].content}
        </p>
    </div>;
}