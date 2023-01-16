import React, { useMemo, useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

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

  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  //callback будет вызван только в это м случае если массив зависимостей был изменен передаем его useMemo() вторым
  // аргументом, sortedPosts лежит ещё один отсартированный массив и при этом массив post никак неизменяется
  const sortedPosts = useMemo(() => {
    console.log("Working getSortedPosts");
    if (selectedSort) {
      //разворачиваем массив в новый массив и сортируем, мутируем копию массива нельзя изменять состояния на прямую
      return [...posts].sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
    }
    return posts;
  }, [selectedSort, posts]);

  //в массиве зависимостей поисковая строка и отсартированный массив, будем реагировать на изменение этих зависимостей
  const sortedAndSearchPosts = useMemo(() => {
    //по поисковой строке фильтруем массив
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery)
    );
  }, [searchQuery, sortedPosts]);

  const createPost = (newPost) => {
    //меняем состояние разворачиваем массив и добавляем в конец новый
    setPosts([...posts, newPost]);
  };

  //получаем post из дочерного компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <>
        <MyInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск..."
        />

        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка по"
          options={[
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" },
          ]}
        />
      </>

      {sortedAndSearchPosts.length !== 0 ? (
        <PostList
          remove={removePost}
          posts={sortedAndSearchPosts}
          title={"Посты про JS"}
        />
      ) : (
        <h1 style={{ textAlign: "center" }}>Посты не найдены</h1>
      )}
    </div>
  );
}

export default App;
