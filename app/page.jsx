import prisma from "@/lib/prisma";
import styles from "./page.module.css";
import Posts from "./components/Posts";
import Link from "next/link";

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className={styles.main}>
        <Link href={'/add-post'}>Add Post</Link>
      <h1>Feed</h1>
      {posts.map((post) => {
        return <Posts key={post.id} {...post} />;
      })}
    </main>
  );
}
