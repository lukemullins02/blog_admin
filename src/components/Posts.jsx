import { useState, useEffect } from "react";
import { deletePost, getPosts, putPublish } from "../services/postService";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Posts() {
  const navigate = useNavigate();
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="min-h-screen w-screen  bg-[#1d3557]">
      <Navbar />
      <h1 className="text-white text-5xl mt-4 text-center ">Articles</h1>

      <ul className="w-full flex flex-col items-center mt-7">
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full flex flex-col mb-7 items-center justify-center"
          >
            <li
              className="
  w-[50%] border-2 text-center text-4xl mb-4 text-white border-indigo-500
  shadow-md rounded px-8 pt-8 pb-12 
  transform transition duration-300 ease-in-out
  hover:bg-indigo-500/20
  hover:scale-105
  hover:shadow-xl
  hover:text-gray-300
  hover:cursor-pointer
"
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              {post.title}
              <p className="text-lg mt-4">{post.user.username}</p>
              <p className="text-lg mt-4">
                {post.uploadAt
                  ? new Date(post.uploadAt).toLocaleDateString("en-US")
                  : "No date available"}
              </p>
            </li>
            <div className="flex items-center justify-center mt-8 gap-3">
              {!post.isPublished && (
                <button
                  onClick={() => {
                    handleStatus(post.id, post.isPublished);
                  }}
                  className="inline-flex  items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                >
                  Not Published
                </button>
              )}
              {post.isPublished && (
                <button
                  onClick={() => {
                    handleStatus(post.id, post.isPublished);
                  }}
                  className="inline-flex  items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                >
                  Published
                </button>
              )}
              <button
                onClick={() => {
                  handleDelete(post.id);
                }}
                className="inline-flex  items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
