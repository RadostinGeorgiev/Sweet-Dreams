import { useEffect, useState } from "react";
import BlogCard from "./BlogCard/BlogCard";

export default function Main() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/c/f4c3-1f33-4174-878d")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
      });
  }, []);

  return (
    <>
      <h1>Sweet Dreams</h1>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </>
  );
}
