import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import type { Article } from "../types/Article";
import Post from './Post';
import Loader from './UI/Loader/Loader';

let API_KEY: string = "apiKey=162dca05c86646d5be3a279d279d44dc";

// DONE:
// Добавить возможность фильтра по категории
// Добавить возможность выбора страны
// добавить темную тему

// NEED TO TEST
// Добавить плавную анимацию появления новостей

// IN PROGRESS
// Добавить поиск по новостям

// TO DO:
// добавить добавить возможность сохранять какие то новости (типа избранного)
// сделать все это адаптивным

type postListType = {
  country: string,
  category: string,
  query: string
}

const PostList = ({country, category, query}: postListType): React.JSX.Element => {
  const [postsList, setPostsList] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mark = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    let URL = "https://newsapi.org/v2/top-headlines?" + `country=${country}&` + `category=${category}&` + `pageSize=50&` + `page=${page}&` + (query !== "" ? `q=${query}&` : "") + API_KEY;
    const fetchPosts = async () => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const response = await axios.get(URL);
        setPage(page + 1);
        setPostsList([...postsList ,...response.data.articles]);
        setIsLoading(false);
      } catch (error) {
        console.error("ERROR:", error);
      }
    };

    const currentMark = mark.current;
    if (!currentMark) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        fetchPosts();
      }
    }, {
      rootMargin: '50px',
    });

    observer.observe(currentMark);
    return () => {
      if (currentMark) observer.unobserve(currentMark);
    };
  }, [page, isLoading, country, category, query]);

  return (
    <div className="postLists">
      {postsList.map((article: Article) => 
        <Post key={article.url} article={article}/>
      )}
      {(isLoading || postsList.length === 0) && <Loader />}
      <div ref={mark}></div>
    </div>
  )
}

export default PostList