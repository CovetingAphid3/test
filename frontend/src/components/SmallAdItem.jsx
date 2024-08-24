import React from 'react'

const SmallAdItem = ({ imgUrl, name, description }) => {
    return (
        <div className="flex flex-row md:flex-col bg-white shadow-md lg:shadow-none p-4 rounded-sm mt-4">
            <img src={imgUrl} alt={name} className="w-20 h-20" />
            <h3 className="text-lg font-semibold text-black">{name}</h3>
            <p className="text-sm max-w-[200px] text-black">{description}</p>
        </div>
    )
}

export default SmallAdItem
