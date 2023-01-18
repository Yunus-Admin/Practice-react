import React, { useMemo, useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/myModal/MyModal";
import Mybutton from "./components/UI/button/Mybutton";
import { usePosts } from "./hooks/usePost";

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
  const [modal, setModal] = useState(false);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    //меняем состояние разворачиваем массив и добавляем в конец новый
    setPosts([...posts, newPost]);
    setModal(false);
  };

  //получаем post из дочерного компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <Mybutton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Создать пользователя
      </Mybutton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

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
