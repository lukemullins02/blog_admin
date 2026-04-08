import { useState } from "react";
import Navbar from "./Navbar";
import { postBlog } from "../services/postService";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    blog: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postBlog(userInput);

      setUserInput({ title: "", blog: "" });

      navigate("/", { replace: true });
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#1d3557]">
      <Navbar />
      <form
        className="w-full flex flex-col items-center mt-7"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-xl text-red-600">{error}</p>}
        <div className="w-[50%] mb-3">
          <label
            className="block text-white text-xl font-bold mb-3"
            htmlFor="title"
          >
            Title{" "}
          </label>
          <input
            className="shadow appearance-none text-white  border rounded w-full py-2 px-3 text-xl leading-tight focus:outline-none focus:shadow-outline"
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
            className="block text-white text-xl font-bold mb-3"
            htmlFor="blog"
          >
            Blog{" "}
          </label>
          <textarea
            className="shadow h-96 appearance-none text-white text-xl border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
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
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewPost;
