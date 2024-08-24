import React, { useState, useEffect, useMemo } from 'react';
import styles from '../style';
import axios from 'axios';
import Spinner from './Spinner';
import { Button } from "./ui/button";
import Title from "./Title";

function HealthNews() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const apiKey = import.meta.env.VITE_NEWS_API_KEY;
            const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&size=2&category=health&language=en`;
            const newsResponse = await axios.get(apiUrl);

            if (!newsResponse.data || !newsResponse.data.results) {
                throw new Error('No data returned from the API');
            }

            setArticles(newsResponse.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderArticles = useMemo(() => {
        return articles.map((article, index) => (
            <div key={index} className="text-start w-full sm:w-1/2 p-4 h-[600px] flex flex-col bg-white m-4 shadow-md">
                <h2 className="text-xl font-bold mb-2">{article.title ? article.title.substring(0, 100) + '...' : 'No title available'}</h2>
                <p className="h-[100px]">{article.description ? article.description.substring(0, 100) + '...' : 'No description available'}</p>
                <p className="mt-2"><strong>Published Date:</strong> {new Date(article.pubDate).toISOString().split('T')[0]}</p>
                <p className="mb-2"><strong>Source:</strong> <a href={article.source_url} target="_blank" rel="noopener noreferrer">{article.source_id}</a></p>
                {article.image_url ? (
                    <img src={article.image_url} alt="Article" className="md:w-[30vw] md:h-[30vh] object-contain " />
                ) : (
                    <div className="w-[30vw] h-[30vh] bg-gray-200 flex justify-center items-center">Image not available</div>
                )}
                <Button className="bg-primary text-white text-md font-bold py-2 px-4 rounded mt-5">
                    <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
                </Button>
            </div>
        ));
    }, [articles]);

    return (
        <div className={`flex flex-col justify-center items-center max-w-7xl mx-auto mb-10 ${styles.boxWidth} ${styles.paddingX}`}>
            <Title id="news">Latest Health News</Title>
            <div className="w-full flex flex-col sm:flex-row justify-center items-center">
                {loading ? <Spinner /> : renderArticles}
            </div>
        </div>
    );
}

export default HealthNews;

