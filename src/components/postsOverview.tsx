import Link from 'next/link';
import React from 'react';

interface PostsOverviewProps {
  posts: Array<{url: string, title: string, date: Date, content: string}>;
  className?: string;
}

export default function PostsOverview(props: PostsOverviewProps) {

    const posts = props.posts;

    return (
      <div className={props?.className}>
        {posts.map((post, index) => (
          <React.Fragment key={index}>
            <Link href={"/blog/" + post.url} className="flex flex-row gap-x-10 py-2 w-[calc(90%)] hover:bg-neutral-800 rounded-md px-4 active:bg-neutral-700 active:text-red-400 transition-all duration-75">
                <p className="text-ellipsis inline-block overflow-hidden whitespace-nowrap w-[calc(90%)]">{post.title}</p>
                <p className="text-gray-500 inline-block text-sm self-end w-[calc(10%)]">{post.date.toLocaleDateString("en-US")}</p>
            </Link>
          </React.Fragment>
        ))}
      </div>
    );
}