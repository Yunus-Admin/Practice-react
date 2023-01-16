import React, { useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import Mybutton from "./components/UI/button/Mybutton";
import MyInput from "./components/UI/input/MyInput";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Javascript", body: "Javascript - язык программирования" },
    {
      id: 2,
      title: "Javascript 2",
      body: "Javascript - язык программирования",
    },
    {
      id: 3,
      title: "Javascript 3",
      body: "Javascript - язык программирования",
    },
  ]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      body,
    };
    setPosts([...posts, newPost]);
  };

  return (
    <div className="App">
      <form>
        <MyInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Название Поста"
        />
        <MyInput
          value={body}
          onChange={(e) => setBody(e.target.value)}
          type="text"
          placeholder="Описание Поста"
        />
        <Mybutton onClick={addNewPost}>Создать пост</Mybutton>
      </form>
      <PostList posts={posts} title={"Посты про JS"} />
    </div>
  );
}

export default App;
