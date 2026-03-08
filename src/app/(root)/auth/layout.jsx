import React from 'react'

const layout = ({ children }) => {
    return (
        <div className='min-h-screen flex items-center justify-center px-4 bg-gray-100'>
            {children}
        </div>
    )
}

export default layout