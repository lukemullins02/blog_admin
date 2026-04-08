import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComments } from "../services/commentService";
import { getPost, putPost } from "../services/postService";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function ExpandPost() {
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState({
    title: "",
    blog: "",
  });

  const { id } = useParams();

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { title, blog } = userInput;

      await putPost(id, { title, blog });

      navigate("/", { replace: true });
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resPost = await getPost(id);

        const resComment = await getComments(id);

        setComments(resComment);
        setUserInput(resPost);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen w-screen  bg-[#1d3557]">
      {" "}
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center mt-7"
      >
        {error && <p className="text-xl text-red-600">{error}</p>}
        <div className="w-[50%] mb-3">
          <label
            className="block text-white text-lg font-bold mb-3"
            htmlFor="title"
          >
            Title{" "}
          </label>
          <input
            className="shadow appearance-none text-white  border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            value={userInput.title}
            onChange={handleChange}
            name="title"
            id="title"
            type="text"
            required
          />
        </div>
        <div className="w-[50%] mb-5">
          <label
            className="block text-white text-lg font-bold mb-3"
            htmlFor="blog"
          >
            Blog{" "}
          </label>
          <textarea
            className="shadow h-96 appearance-none text-white  border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            value={userInput.blog}
            onChange={handleChange}
            name="blog"
            id="blog"
            required
          ></textarea>
        </div>
        <div>
          <button
            className="inline-flex cursor-pointer items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Post
          </button>
        </div>
      </form>
      <div className="w-full text-white flex flex-col  mt-7">
        <h1 className="text-4xl mb-4 ml-10">Comments</h1>

        <ul className="w-full flex flex-col items-center mt-4">
          {comments.map((comment) => (
            <li
              className="
  w-[30%] border  text-2xl text-white border-indigo-500
  shadow-md rounded px-2 pt-2 pb-4 mb-7
  transform transition duration-300 ease-in-out

  "
              key={comment.id}
            >
              <p className="text-xl mt-1">
                {comment.user.username}{" "}
                <span className="text-base text-gray-400">
                  {" "}
                  {comment.uploadAt
                    ? new Date(comment.uploadAt).toLocaleString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "No date available"}
                </span>
              </p>
              {comment.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpandPost;
