import React from 'react'

const PagenotFound = () => {
  return (
    <>
        <div className='flex h-screen items-center justify-center space-x-4 flex-col'>
            <span className='text-xl font-semibold text-green-500 '>404</span>
            
            <div className='text-xl font-semibold text-red-500'> Page Not Found</div>
        </div>
    </>
  )
}

export default PagenotFound