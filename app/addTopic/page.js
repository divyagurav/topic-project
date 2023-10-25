"use client";

import { useState } from "react";
import { useRouter } from "next/router";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handlerSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description) {
      alert("Title or description are required");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handlerSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      ></input>
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder=" Topic Description"
      ></input>
      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Topic
      </button>
    </form>
  );
}
