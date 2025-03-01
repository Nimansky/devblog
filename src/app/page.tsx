import { run } from "@/db/connect";
import { Post } from "@/db/schema";
import React from "react";
import Link from "next/link";

export default async function Home() {

  await run().catch((error: Error) => console.error('Error connecting to MongoDB', error));

  // TEST INSERT
  // const new_post = new Post({ url: 'new-post-2', title: 'New Post 2', date: Date.now(), content: 'new post 2' });
  // new_post.save().then((error: Error) => console.log(error)).catch((error: Error) => console.error('Error saving new post', error));

  const posts = await Post.find();

  return (
    <div>
      <h1>Home</h1>
      {posts.map((post, index) => (
        <React.Fragment key={index}>
          <Link href={"/blog/" + post.url}>{post.title}</Link>
        </React.Fragment>
      ))}
    </div>
  );

}
