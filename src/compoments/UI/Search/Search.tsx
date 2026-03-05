import React, { useState, useRef } from 'react';

type queryType = {
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

const Search = ({query, setQuery}: queryType) => {
  const [displayQuery, setDisplayQuery] = useState<string>(query);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function changeHandler(query: string){
    setDisplayQuery(query);
    if (timerRef.current){
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setQuery(query);
    }, 300);
  };

  return (
    <div className="search__container">
      <input placeholder='Search...' className="search__input" value={displayQuery} onChange={(event) => changeHandler(event.target.value)}></input>
      <svg className="search__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.323 13.383a5.5 5.5 0 1 1 1.06-1.06l2.897 2.897a.75.75 0 1 1-1.06 1.06l-2.897-2.897Zm.677-4.383a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/></svg>
    </div>
  )
}

export default Search