import PostList from "./compoments/PostList"
import MySelect from "./compoments/UI/Select/MySelect"
import { useState } from 'react';
import ThemeToggle from "./compoments/UI/Toggle/ThemeToggle";
import Search from "./compoments/UI/Search/Search";

const countryOptions = [
  {value: "ru", name: "Russia"},
  {value: "us", name: "United States"},
  {value: "de", name: "Germany"},
  {value: "fr", name: "France"},
  {value: "cn", name: "China"},
  {value: "ua", name: "Ukraine"},
  {value: "il", name: "Israel"},
  {value: "ir", name: "Iran"},
  {value: "jp", name: "Japan"},
];

const categoryOptions = [
  {value: "business", name: "Business"},
  {value: "entertainment", name: "Entertainment"},
  {value: "general", name: "General"},
  {value: "health", name: "Health"},
  {value: "science", name: "Science"},
  {value: "sports", name: "Sports"},
  {value: "technology", name: "Technology"},
];

function App() {
  const [country, setCountry] = useState<string>("us");
  const [category, setCategory] = useState<string>("general");
  const [query, setQuery] = useState<string>("");

  return (
    <div>
      <header>
        <div className="header__container">
          <a href="#" className="header__content">
            The world is on fire
          </a>
        </div>
        <ThemeToggle />
      </header>
      <main className="main-container">
        <Search query={query} setQuery={setQuery} />
        <div className="filter-container">
          <MySelect options={countryOptions} defaultValue="Choose country" value={country} onChange={setCountry} />
          <MySelect options={categoryOptions} defaultValue="Choose category" value={category} onChange={setCategory} />
        </div>
        <PostList country={country} category={category} query={query}/>
      </main>
      <footer className="footer">
        We have a problem with the news, if you see this, sorry
      </footer>
    </div>
  )
}

export default App
