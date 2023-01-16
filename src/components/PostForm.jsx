import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import Mybutton from "./UI/button/Mybutton";

const PostForm = ({ create }) => {
  //состояние по умол объект с пустыми полями
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPost({ title: "", body: "" }); //тут очищаем инпуты
  };

  return (
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
  );
};

export default PostForm;
