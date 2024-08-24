import React from 'react'
import { Button } from './ui/button'

const SearchBar = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-row sm:ml-40 md:mt-0 mt-6 sm:mb-0 mb-6">

                <input
                    type="text"
                    placeholder="Search..."
                    className="w-[80%] sm:w-full border border-black py-1 px-3 focus:outline-none focus:border-blue-500 text-black"
                />
                <Button className="ml-2 text-white font-bold text-md bg-blue hover:bg-crimson/90">Search</Button>
            </div>

        </div>
    )
}

export default SearchBar
