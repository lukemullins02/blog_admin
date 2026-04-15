import { useNavigate } from "react-router-dom";

function Post({ post, handleStatus, handleDelete }) {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col mb-7 items-center justify-center">
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
  );
}

export default Post;
