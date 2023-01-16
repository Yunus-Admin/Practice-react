import React, { useMemo, useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Javascript", body: "Javascript - язык программирования" },
    {
      id: 2,
      title: "Php",
      body: "Php - язык программирования",
    },
    {
      id: 3,
      title: "Python",
      body: "Python - язык программирования",
    },
  ]);

  const [filter, setFilter] = useState({ sort: "", query: "" });

  //callback будет вызван только в это м случае если массив зависимостей был изменен передаем его useMemo() вторым
  // аргументом, sortedPosts лежит ещё один отсартированный массив и при этом массив post никак неизменяется
  const sortedPosts = useMemo(() => {
    console.log("Working getSortedPosts");
    if (filter.sort) {
      //разворачиваем массив в новый массив и сортируем, мутируем копию массива нельзя изменять состояния на прямую
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return posts;
  }, [filter.sort, posts]);

  //в массиве зависимостей поисковая строка и отсартированный массив, будем реагировать на изменение этих зависимостей
  const sortedAndSearchPosts = useMemo(() => {
    //по поисковой строке фильтруем массив
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query)
    );
  }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
    //меняем состояние разворачиваем массив и добавляем в конец новый
    setPosts([...posts, newPost]);
  };

  //получаем post из дочерного компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />

      <PostList
        remove={removePost}
        posts={sortedAndSearchPosts}
        title={"Посты про JS"}
      />
    </div>
  );
}

export default App;
