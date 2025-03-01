import { run } from "@/db/connect";
import { Post } from "@/db/schema";

type AdminEntryProps = {
    postURL: string;
}

export default async function AdminEntry({postURL}: AdminEntryProps) {
  
  await run().catch((error: Error) => console.error('Error connecting to MongoDB', error));
  const post = await Post.find().where('url').equals(postURL);

  return (
      <div>
          <p>
              Title: {post[0].title}
          </p>
          <p>
              Published: {post[0].date.toString()}
          </p>
          <button>
              Edit
          </button>
          <button>
              Delete
          </button>
      </div>
  );
}