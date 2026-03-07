import React, { useEffect, useRef } from 'react';
import type { Article } from "../types/Article";
import Post from './Post';
import Loader from './UI/Loader/Loader';
import useNews from '../hooks/useNews';

type postListType = {
  country: string,
  category: string,
  query: string
}

const PostList = ({country, category, query}: postListType): React.JSX.Element => {
  const mark = useRef<HTMLDivElement>(null);
  const [postsList, isLoading, setPage] = useNews(country, category, query);

  useEffect(() => {
    const currentMark = mark.current;
    if (!currentMark) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        setPage(p => p + 1);
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