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

  //состояние по умол объект с пустыми полями
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    //меняем состояние и тут в наш массив с объектами записываем то что ввёл юзер
    setPosts([...posts, { ...post, id: Date.now() }]);
    setPost({ title: "", body: "" }); //тут очищаем инпуты
  };

  return (
    <div className="App">
      <form>
        <MyInput
          value={post.title} //разворачиваем post и тут перезаписываем состояние с пустого title на что ввёл юзер
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          type="text"
          placeholder="Название Поста"
        />
        <MyInput
          value={post.body} //разворачиваем post и так же перезаписываем body
          onChange={(e) => setPost({ ...post, body: e.target.value })}
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
