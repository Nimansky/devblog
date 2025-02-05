import { run } from "../db/connect";
// import { Post } from "../db/schema";

export default async function Home() {
  
  await run().catch((error: Error) => console.error('Error connecting to MongoDB', error));

  // const new_post = new Post({ url: 'new-post', title: 'New Post', content: 'This is a new post' });
  // new_post.save().then((error: Error) => console.log(error)).catch((error: Error) => console.error('Error saving new post', error));

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
  
}
