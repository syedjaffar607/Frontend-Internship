
import { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Posts load nahi ho sake.");
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch(() => setPostsError("Posts load nahi ho sake."))
      .finally(() => setPostsLoading(false));
  }, []);

  return (
    <section className="posts-section">
      <h2>My React Posts</h2>

      {postsLoading ? (
        <p>Loading posts...</p>
      ) : postsError ? (
        <p>{postsError}</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <article className="post-card" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Posts;
