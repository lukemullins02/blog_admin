import { useState } from "react";
import Navbar from "./Navbar";
import { postBlog } from "../services/postService";
import { useNavigate } from "react-router-dom";
import ExpandPostForm from "./forms/ExpandPostForm";

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
      <ExpandPostForm
        userInput={userInput}
        error={error}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        text="Create Post"
      />
    </div>
  );
}

export default NewPost;
