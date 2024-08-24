import React from 'react'

const Unauthorized = () => {
    return (
        
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-md bg-white p-8 rounded shadow-md">
                <h1 className="text-3xl font-bold mb-4 text-center">Unauthorized Access</h1>
                <p className="text-gray-700 text-center mb-4">Sorry, you are not authorized to access this page.</p>
                <p className="text-gray-700 text-center">Please contact the administrator for further assistance.</p>
            </div>
        </div>

    )
}

export default Unauthorized
