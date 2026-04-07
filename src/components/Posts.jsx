import { useState, useEffect } from "react";
import { getPosts } from "../services/postService";
import { useNavigate } from "react-router-dom";

function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <h1 className="text-white text-5xl mt-4 text-center ">Articles</h1>

      <ul className="w-full flex flex-col items-center mt-7">
        {posts.map((post) => (
          <li
            className="
  w-[50%] border-2 text-center text-4xl text-white border-indigo-500
  shadow-md rounded px-8 pt-8 pb-12 mb-7
  transform transition duration-300 ease-in-out
  hover:bg-indigo-500/20
  hover:scale-105
  hover:shadow-xl
  hover:text-gray-300
  hover:cursor-pointer
"
            key={post.id}
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
        ))}
      </ul>
    </div>
  );
}

export default Posts;
