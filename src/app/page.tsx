/* eslint-disable @next/next/no-img-element */
import PostsOverview from "@/components/postsOverview";
import Link from 'next/link';

import { promises as fs } from 'fs';

export default async function Home() {
  
  const urls = await fs.readdir(process.cwd() + '/src/pages');

  const posts: Array<{url: string, title: string, date: Date, content: string}> = []

  for (const url of urls) {
    const file = await fs.readFile(process.cwd() + '/src/pages/' + url, 'utf-8');
    const date = (await fs.stat(process.cwd() + '/src/pages/' + url)).mtime;
    
    const lines = file.split('\n');
    const draft = lines[0].split(':')[1].trim() === 'true';
    const title = lines[1];
    const content = lines.slice(2).join('\n');

    if(!draft)
      posts.push({url: url.slice(0, url.lastIndexOf('.md')), title: title, date: date, content: content});
  }

  posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div>
    <div className="flex justify-center items-center flex-row bg-neutral-900 text-white h-screen w-screen gap-20 px-20 min-h-0">
      <div id="title-card" className="w-6/12 h-1/3 flex items-center justify-end">
        <div className="flex flex-col">
          <h1 className="font-vt323 text-8xl after:content-[''] after:align-baseline after:ml-[-1.75rem] after:w-7 after:h-16 after:bg-white after:inline-block after:animate-[cursor-blink_1s_step-end_infinite]">/dev/blog/ <p className="font-vt323 inline text-red-400">&gt;</p> &nbsp;</h1>
          <h2 className="text-xl self-center">just some shenanigans</h2>
        </div>
      </div>
      <div className="w-1 h-1/3 bg-red-400" />
      <div className="w-6/12 h-1/3 overflow-y-auto overflow-x-hidden">
        <PostsOverview posts={posts} className="flex justify-center items-start flex-col"/>
      </div>
    </div>
    <div className="absolute bottom-0 w-full flex flex-row justify-center items-center">
      <p className="text-gray-500 text-base py-2 h-full">&copy; Nima Baradaran -&nbsp;
      <Link href="https://github.com/Nimansky"><img src='img/github-mark-white.svg' alt="GitHub" className="inline h-6 w-auto align-text-bottom"  draggable="false"/></Link>
      &nbsp;
      <Link href="https://www.linkedin.com/in/nima-baradaran-hassanzadeh-417063243/"><img src='img/linkedin.svg' alt="GitHub" className="inline h-6 w-auto align-text-bottom"  draggable="false"/></Link>
      </p>
    </div>
    </div>
  );
  
}
