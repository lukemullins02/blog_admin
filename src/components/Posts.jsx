import { useState, useEffect } from "react";
import { deletePost, getPosts, putPublish } from "../services/postService";
import Post from "./templates/Post";
import Navbar from "./Navbar";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleStatus = async (postid, published) => {
    try {
      await putPublish(postid, { published: !published });

      const response = await getPosts();

      setPosts([...response]);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      } else {
        console.log("Something went wrong. Please try again.");
      }
    }
  };

  const handleDelete = async (postid) => {
    try {
      const userInput = prompt(
        "Are you sure you want to delete? Enter yes or no.",
      );

      if (userInput.toLowerCase() === "yes") {
        await deletePost(postid);

        const response = await getPosts();

        setPosts([...response]);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      } else {
        console.log("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();

        setPosts(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-white text-xl pl-4">Loading...</p>;
  if (error) return <p className="text-red-600 text-xl pl-4">Error: {error}</p>;
  return (
    <div className="min-h-screen w-screen  bg-[#1d3557]">
      <Navbar />
      <h1 className="text-white text-5xl mt-4 text-center ">Articles</h1>

      <ul className="w-full flex flex-col items-center mt-7">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            handleStatus={handleStatus}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default Posts;
