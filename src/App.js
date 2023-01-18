import React, { useEffect, useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/myModal/MyModal";
import Mybutton from "./components/UI/button/Mybutton";
import { usePosts } from "./hooks/usePost";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import { useFetching } from "./hooks/useFetching";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPosts(posts);
  });

  useEffect(() => {
    fetchPosts();
  }, []);

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

      {postError && <h1>Произошла ошибка ${postError}</h1>}

      {isPostLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchPosts}
          title={"Посты про JS"}
        />
      )}
    </div>
  );
}

export default App;
