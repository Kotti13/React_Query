import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import "../assets/css/Loaders.css";
import "../assets/css/Editbtn.css";

const API_URL = "http://localhost:3002/cars";

// CRUD API functions
const fetchPosts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

const addPost = async (postData) => {
  const { data } = await axios.post(API_URL, postData);
  return data;
};

const deletePost = async (postId) => {
  const { data } = await axios.delete(`${API_URL}/${postId}`);
  return data;
};

const updatePost = async ({ id, updatedPost }) => {
  const { data } = await axios.put(`${API_URL}/${id}`, updatedPost);
  return data;
};

export default function UserForm() {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const queryClient = useQueryClient();

  const {
    data: Cars,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Cars"],
    queryFn: fetchPosts,
  });

  const createMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Cars"] });
      setNewTitle("");
      setNewDescription("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Cars"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Cars"] });
      setNewTitle("");
      setNewDescription("");
      setIsEditMode(false);
      setEditId(null);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateMutation.mutate({
        id: editId,
        updatedPost: {
          title: newTitle,
          description: newDescription,
        },
      });
    } else {
      createMutation.mutate({
        title: newTitle,
        description: newDescription,
      });
    }
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(postId);
    }
  };

  const handleEdit = (post) => {
    setNewTitle(post.title);
    setNewDescription(post.description);
    setIsEditMode(true);
    setEditId(post.id);
  };

  if (isLoading) return <div className="illusion"></div>;
  if (isError) return <div>Error loading Cars</div>;

  return (
    <>
      <h2 className="text-2xl font-bold text-blue-500 text-center mt-6 mb-5">
        Create, Read, Update, Delete (CRUD)
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex gap-4 flex-wrap justify-center mb-4"
      >
        <input
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
          className="border-2 border-amber-600 rounded-lg text-center font-semibold p-2 focus:ring-2 focus:ring-amber-500"
        />
        <input
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          required
          className="border-2 border-amber-600 rounded-lg text-center font-semibold p-2 focus:ring-2 focus:ring-amber-500"
        />
        <button type="submit" className="button">
          {isEditMode ? "Update Post" : "Add Post"}
        </button>
        {isEditMode && (
          <button
            type="button"
            onClick={() => {
              setIsEditMode(false);
              setNewTitle("");
              setNewDescription("");
              setEditId(null);
            }}
            className="button bg-gray-400"
          >
            Cancel
          </button>
        )}
      </form>

      <div>
        {Cars?.map(
          (post) =>
            post?.id && ( // ✅ check if post.id exists
              <div
                key={post.id} // ✅ ensure each element has a unique key
                className="flex justify-between items-center bg-[#FDFAF6] p-4 mb-4 rounded-lg shadow-md"
              >
                <div>
                  <h2 className="text-lg font-bold text-amber-700">
                    <span className="mr-4 text-cyan-950">Title:</span>
                    {post.title}
                  </h2>
                  <p className="text-lg font-semibold text-cyan-500">
                    {post.description}
                  </p>
                </div>
                <div className="flex items-center space-x-4 ml-4">
                  <button className="button" onClick={() => handleEdit(post)}>
                    Edit
                  </button>
                  <button
                    className="button"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}
