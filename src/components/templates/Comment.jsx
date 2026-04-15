function Comment({
  comment,
  editingCommentId,
  errorComment,
  editedText,
  setEditedText,
  handleSaveEdit,
  handleCancelEdit,
  handleEditClick,
  handleDelete,
  id,
}) {
  return (
    <div className="w-full flex flex-col mb-7 items-center justify-center">
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
  );
}

export default Comment;
