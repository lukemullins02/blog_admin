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
import ExpandPostForm from "./forms/ExpandPostForm";
import Comment from "./templates/Comment";

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

  if (loading) return <p className="text-white text-xl pl-4">Loading...</p>;

  return (
    <div className="min-h-screen w-screen bg-[#1d3557]">
      <Navbar />
      <ExpandPostForm
        userInput={userInput}
        error={error}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        text="Update Post"
      />
      <div className="w-full text-white flex flex-col mt-7">
        <h1 className="text-4xl mb-6 ml-10">Comments</h1>

        <ul className="w-full flex flex-col items-center mt-4">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              editingCommentId={editingCommentId}
              errorComment={errorComment}
              editedText={editedText}
              setEditedText={setEditedText}
              handleSaveEdit={handleSaveEdit}
              handleCancelEdit={handleCancelEdit}
              handleEditClick={handleEditClick}
              handleDelete={handleDelete}
              id={id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpandPost;
