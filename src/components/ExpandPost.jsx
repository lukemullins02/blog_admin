import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  deleteComment,
  getComments,
  putComment,
} from "../services/commentService";
import { getPost, putPost } from "../services/postService";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function ExpandPost() {
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorComment, setErrorComment] = useState(null);
  const [userInput, setUserInput] = useState({
    title: "",
    blog: "",
  });

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");

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

  const handleDelete = async (postid, commentid) => {
    try {
      const confirmDelete = prompt(
        "Are you sure you want to delete? Enter yes or no.",
      );

      if (confirmDelete?.toLowerCase() === "yes") {
        await deleteComment(postid, commentid);

        const response = await getComments(postid);
        setComments(response);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      } else {
        console.log("Something went wrong. Please try again.");
      }
    }
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditedText(comment.text);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedText("");
  };

  const handleSaveEdit = async (commentId) => {
    try {
      await putComment(id, commentId, { text: editedText });

      const updatedComments = await getComments(id);
      setComments(updatedComments);

      setErrorComment(null);
      setEditingCommentId(null);
      setEditedText("");
    } catch (err) {
      if (err.response) {
        setErrorComment(err.response.data.message);
      } else {
        setErrorComment("Something went wrong. Please try again.");
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

  if (loading) return <p className="text-white text-xl">Loading...</p>;

  return (
    <div className="min-h-screen w-screen bg-[#1d3557]">
      <Navbar />

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center mt-7"
      >
        {error && <p className="text-xl text-red-600">{error}</p>}

        <div className="w-[50%] mb-3">
          <label className="block text-white text-xl font-bold mb-3">
            Title
          </label>

          <input
            className="shadow appearance-none text-xl text-white border rounded w-full py-2 px-3 leading-tight focus:outline-none"
            value={userInput.title}
            onChange={handleChange}
            name="title"
            type="text"
            required
          />
        </div>

        <div className="w-[50%] mb-5">
          <label className="block text-white text-xl font-bold mb-3">
            Blog
          </label>

          <textarea
            className="shadow h-96 appearance-none text-xl text-white border rounded w-full py-2 px-3 leading-tight focus:outline-none"
            value={userInput.blog}
            onChange={handleChange}
            name="blog"
            required
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          type="submit"
        >
          Update Post
        </button>
      </form>
      <div className="w-full text-white flex flex-col mt-7">
        <h1 className="text-4xl mb-6 ml-10">Comments</h1>

        <ul className="w-full flex flex-col items-center mt-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="w-full flex flex-col mb-7 items-center justify-center"
            >
              <li className="w-[30%] border text-2xl text-white border-indigo-500 shadow-md rounded px-4 pt-3 pb-4">
                <p className="text-xl">
                  {comment.user.username}
                  <span className="text-base text-gray-400 ml-2">
                    {comment.uploadAt
                      ? new Date(comment.uploadAt).toLocaleString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })
                      : "No date available"}
                  </span>
                </p>
                {editingCommentId === comment.id ? (
                  <>
                    {errorComment && (
                      <p className="text-xl text-red-600">{errorComment}</p>
                    )}
                    <textarea
                      className="w-full mt-3 bg-[#1d3557] text-white p-3 rounded border border-gray-400 focus:outline-none"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />

                    <div className="flex justify-center gap-3 mt-3">
                      <button
                        onClick={() => handleSaveEdit(comment.id)}
                        className="cursor-pointer bg-green-500 hover:bg-green-700 text-xl font-bold text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>

                      <button
                        onClick={handleCancelEdit}
                        className="cursor-pointer bg-gray-500 hover:bg-gray-700 text-xl font-bold text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mt-3 text-2xl wrap-break-word  whitespace-pre-wrap">
                      {comment.text}
                    </p>

                    <div className="flex justify-center gap-3 mt-4">
                      <button
                        onClick={() => handleEditClick(comment)}
                        className="bg-blue-500 hover:bg-blue-700  text-xl text-white font-bold  py-2 px-4 rounded cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(id, comment.id)}
                        className="bg-red-500 cursor-pointer hover:bg-red-700 text-xl font-bold  text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpandPost;
