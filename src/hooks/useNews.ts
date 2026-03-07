import React, { useEffect, useState } from 'react';
import type { Article } from "../types/Article";
import axios from 'axios';

let API_KEY: string = "apiKey=162dca05c86646d5be3a279d279d44dc";

function createUrl(country: string, category: string, page: number, query: string) {
  return "https://newsapi.org/v2/top-headlines?" + `country=${country}&` + `category=${category}&` + `pageSize=40&` + `page=${page}&` + (query !== "" ? `q=${query}&` : "") + API_KEY
}

const useNews = (country: string, category: string, query: string): [Article[], boolean, React.Dispatch<React.SetStateAction<number>> ] => {
  const [postsList, setPostsList] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  return [postsList, isLoading, setPage];
}

export default useNews