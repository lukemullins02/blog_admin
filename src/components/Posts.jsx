import { useEffect, useReducer } from "react";
import { deletePost, getPosts, putPublish } from "../services/postService";
import Post from "./templates/Post";
import Navbar from "./Navbar";

const postReducer = (state, action) => {
  console.log(state.posts);

  switch (action.type) {
    case "FETCH_POSTS_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case "FETCH_POSTS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case "TOGGLE_PUBLISH_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload
            ? { ...post, isPublished: !post.isPublished }
            : post,
        ),
      };
    default:
      return state;
  }
};

function Posts() {
  const [state, dispatch] = useReducer(postReducer, {
    posts: [],
    loading: false,
    error: null,
  });

  const handleStatus = async (postid, published) => {
    try {
      await putPublish(postid, { published: !published });

      dispatch({
        type: "TOGGLE_PUBLISH_POST",
        payload: postid,
      });
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

        dispatch({
          type: "DELETE_POST",
          payload: postid,
        });
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
    dispatch({
      type: "FETCH_POSTS_START",
    });

    const fetchPosts = async () => {
      try {
        const response = await getPosts();

        dispatch({
          type: "FETCH_POSTS_SUCCESS",
          payload: response,
        });
      } catch (err) {
        dispatch({
          type: "FETCH_POSTS_ERROR",
          payload: err.message,
        });
      }
    };

    fetchPosts();
  }, []);

  if (state.loading)
    return <p className="text-white text-xl pl-4">Loading...</p>;
  if (state.error)
    return <p className="text-red-600 text-xl pl-4">Error: {state.error}</p>;
  return (
    <div className="min-h-screen w-screen  bg-[#1d3557]">
      <Navbar />
      <h1 className="text-white text-5xl mt-4 text-center ">Articles</h1>

      <ul className="w-full flex flex-col items-center mt-7">
        {state.posts.map((post) => (
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
