import { useState } from 'react'
import { Post } from '@/lib/types'

export default function SearchInput() {
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = async () => {
    const postIds = searchInput.split(',').map(val => Number(val))
    try {
      const requests = postIds.map(id => fetchPosts(id))
      const posts = await Promise.all(requests)
      // TODO: save result to Redux state posts
      console.log('search posts list:', posts)
    } catch {
      // TODO: add redux isLoading, isError
      console.log('error searching post ids')
    }
  }

  const fetchPosts = async (id: number): Promise<Post> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data: Post = await res.json()
    return data
  }

  return (
    <div className="mb-4 flex gap-3 items-center justify-center">
      <input
        type="text"
        className='px-3 py-2 rounded shadow-lg border-2 border-gray-400'
        placeholder='1, 2, 3'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button
        className='text-white bg-blue-500 focus:bg-blue-700 disabled:bg-gray-500 disabled:text-gray-300 rounded px-3 py-2'
        disabled={!searchInput.length}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  )
}