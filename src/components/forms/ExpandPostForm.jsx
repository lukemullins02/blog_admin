function ExpandPostForm({
  userInput,
  error,
  handleChange,
  handleSubmit,
  text,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center mt-7"
    >
      {error && <p className="text-xl text-red-600">{error}</p>}

      <div className="w-[50%] mb-3">
        <label className="block text-white text-xl font-bold mb-3">Title</label>

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
        <label className="block text-white text-xl font-bold mb-3">Blog</label>

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
        {text}
      </button>
    </form>
  );
}

export default ExpandPostForm;
