import React from "react";
import Link from "next/link";
import { promises as fs } from 'fs';

export default async function Home() {

  const urls = await fs.readdir(process.cwd() + '/src/pages');

  const posts: Array<{url: string, title: string, date: Date, content: string}> = []

  for (const url of urls) {
    const file = await fs.readFile(process.cwd() + '/src/pages/' + url, 'utf-8');
    
    const lines = file.split('\n');
    const title = lines[0];
    const date = new Date(lines[1]);
    const content = lines.slice(2).join('\n');

    posts.push({url: url.slice(0, url.lastIndexOf('.md')), title: title, date: date, content: content});
  }

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
