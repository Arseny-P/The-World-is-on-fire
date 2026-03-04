import * as _ from 'lodash'

type queryType = {
  query: string,
  setQuery: any
}

const Search = ({query, setQuery}: queryType) => {
  return (
    <div className="search__container">
      <input placeholder='Search...' className="search__input" value={query} onChange={(event) => _.throttle(setQuery, 100)(event.target.value)}></input>
      <svg className="search__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.323 13.383a5.5 5.5 0 1 1 1.06-1.06l2.897 2.897a.75.75 0 1 1-1.06 1.06l-2.897-2.897Zm.677-4.383a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/></svg>
    </div>
  )
}

export default Search