import React from 'react'

const UrlPage = async ({params}: { params: Promise<{slug:string}>} ) => {
  const {slug} = await params
  // console.log(slug)
  return (
    <div>{slug}</div>
  )
}

export default UrlPage