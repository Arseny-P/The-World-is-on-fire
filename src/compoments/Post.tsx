import type { Article } from "../types/Article"

/*
source": {
    "id": null,
    "name": "MarketWatch"
},
"author": "Joseph Adinolfi, Christine Idzelis, Jamie Chisholm, Jules Rimmer, Barbara Kollmeyer, Steve Goldstein",
"title": "Stock Market Today: Dow set for 500-point retreat as oil climbs nearly $6 per barrel after attack on Iran - MarketWatch",
"description": "Stocks open lower as the Iran conflict continues into a third day.",
"url": "https://www.marketwatch.com/livecoverage/stock-market-today-dow-set-for-600-point-retreat-as-oil-climbs-5-per-barrel-after-attack-on-iran",
"urlToImage": "https://images.mktw.net/im-65913427/social",
"publishedAt": "2026-03-02T14:02:00Z",
"content": null
*/

const Post = ({article}: {article: Article}) => {
  return (
    <div className='article'>
        <img className='article__image' src={article.urlToImage ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Operation_Upshot-Knothole_-_Badger_001.jpg/960px-Operation_Upshot-Knothole_-_Badger_001.jpg"} alt="post image" />
        <div className='article__content'>
            <h1 className='article__title'>{article.title}</h1>
            <h4 className='article__author'>{article.author}</h4>
            <p className='article__desc'>{article.description}</p>
            <a className='article__link' href={article.url}>Read more</a>
        </div>
    </div>
  )
}

export default Post;