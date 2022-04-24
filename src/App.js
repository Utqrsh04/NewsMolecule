import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavbarComp from "./components/NavbarComp";
import NewsContent from "./components/NewsContent/NewsContent";

function App() {
  const [category, setCategory] = useState("general");

  const [newsArr, setNewsArr] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(20);

  const newsAPI = async () => {
    try {
      const news = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=1ed57ccac10840e880bc06620795ba24&pageSize=${loadMore}&category=${category}`
      );
      setNewsArr(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(newsArr);

  useEffect(() => {
    newsAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, newsResults, loadMore]);

  return (
    <div className="App">
      <NavbarComp setCategory={setCategory} />
      {newsResults && (
        <NewsContent
          newsArray={newsArr}
          newsResults={newsResults}
          loadMore={loadMore}
          setLoadMore={setLoadMore}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
