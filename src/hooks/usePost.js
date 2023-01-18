import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  //callback будет вызван только в это м случае если массив зависимостей был изменен передаем его useMemo() вторым
  // аргументом, sortedPosts лежит ещё один отсартированный массив и при этом массив post никак неизменяется
  return useMemo(() => {
    console.log("Working getSortedPosts");
    if (sort) {
      //разворачиваем массив в новый массив и сортируем, мутируем копию массива нельзя изменять состояния на прямую
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]);
};

//hook фильтрует и сортирует
export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);

  //в массиве зависимостей поисковая строка и отсартированный массив, будем реагировать на изменение этих зависимостей
  return useMemo(() => {
    //по поисковой строке фильтруем массив
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
  }, [query, sortedPosts]);
};
