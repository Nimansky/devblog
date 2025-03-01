import { Post } from '@/db/schema';
import { run } from '@/db/connect';
import AdminEntry from '@/components/adminEntry';

export default async function Admin() {

    await run().catch((error: Error) => console.error('Error connecting to MongoDB', error));

    const posts = await Post.find();


    return (
        <div>
            {posts.map((post, index) => (
                <div key={index}>
                    <AdminEntry postURL={post.url}></AdminEntry>
                </div>
            ))}
        </div>
    );
    
}