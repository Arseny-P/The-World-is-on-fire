import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import type { Article } from "../types/Article";
import Post from './Post';
import Loader from './UI/Loader/Loader';

let API_KEY: string = "apiKey=162dca05c86646d5be3a279d279d44dc";

type postListType = {
  country: string,
  category: string,
  query: string
}

function createUrl(country: string, category: string, page: number, query: string) {
  return "https://newsapi.org/v2/top-headlines?" + `country=${country}&` + `category=${category}&` + `pageSize=40&` + `page=${page}&` + (query !== "" ? `q=${query}&` : "") + API_KEY
}

const PostList = ({country, category, query}: postListType): React.JSX.Element => {
  const [postsList, setPostsList] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mark = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);

  let URL = createUrl(country, category, page, query);

  useEffect(() => {
    const fetchPosts = async () => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const response = await axios.get(URL);
        setPostsList([...postsList ,...response.data.articles]);
        setIsLoading(false);
      } catch (error) {
        console.error("ERROR:", error);
      }
    }

    fetchPosts();
  }, [page])

  useEffect(() => {
    const fetchPosts = async () => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const response = await axios.get(URL);
        setPostsList([...response.data.articles]);
        setPage(1);
        setIsLoading(false);
      } catch (error) {
        console.error("ERROR:", error);
      }
    }

    fetchPosts();
  }, [country, category, query])

  useEffect(() => {
    const currentMark = mark.current;
    if (!currentMark) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        setPage(page + 1);
      }
    }, {
      rootMargin: '50px',
    });

    observer.observe(currentMark);
    return () => {
      if (currentMark) observer.unobserve(currentMark);
    };
  }, [isLoading]);

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