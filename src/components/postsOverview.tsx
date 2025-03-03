import { promises as fs } from 'fs';
import Link from 'next/link';
import React from 'react';

interface PostsOverviewProps {
    className?: string;
}

export default async function PostsOverview(props: PostsOverviewProps) {

    const urls = await fs.readdir(process.cwd() + '/public/pages');

    const posts: Array<{url: string, title: string, date: Date, content: string}> = []
  
    for (const url of urls) {
      const file = await fs.readFile(process.cwd() + '/public/pages/' + url, 'utf-8');
      
      const lines = file.split('\n');
      const title = lines[0];
      const date = new Date(lines[1]);
      const content = lines.slice(2).join('\n');
  
      posts.push({url: url.slice(0, url.lastIndexOf('.md')), title: title, date: date, content: content});
    }

    return (
      <div className={props?.className}>
        {posts.map((post, index) => (
          <React.Fragment key={index}>
            <Link href={"/blog/" + post.url} className="flex flex-row gap-5 w-[calc(90%)] hover:underline active:text-red-400">
                <p className="text-ellipsis inline-block overflow-hidden whitespace-nowrap w-[calc(90%)]">{post.title}</p>
                <p className="text-gray-500 inline-block text-sm self-end w-[calc(10%)]">{post.date.toLocaleDateString()}</p>
            </Link>
          </React.Fragment>
        ))}
      </div>
    );
}