import React from 'react'

const NewsArticle = ({ title, description, pubDate, source_url, source_id, imgUrl, link }) => {
    return (
        <div className='text-white border border-white-200 rounded-lg overflow-hidden'>
            <img src={imgUrl} alt="article"
                className="w-full h-36 md:h-48 object-cover cursor-pointer rounded-lg shadow-sm"
            />
            <div className='w-full p-4'>
                <h3 className="text-lg md:text-xl mb-2 md:mb-3 font-semibold">{title}</h3>
                <p className='flex flex-wrap gap-2 flex-row items-center justify-start text-xs md:text-sm'>
                    {description}
                </p>
                <p>Published Date: {pubDate}</p>
                <p>Source: <a href={source_url}>{source_id}</a></p>
                <button className="bg-primary text-white font-bold py-2 px-4 rounded mt-5"><p><a href={link}>Read more</a></p>
                </button>

            </div>

        </div>

    )
}

export default NewsArticle
