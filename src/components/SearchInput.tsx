import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPosts, setisLoading, setIsError } from '@/store/postsSlice'
import { Post } from '@/lib/types'

export default function SearchInput() {
  const dispatch = useDispatch()

  const [searchInput, setSearchInput] = useState('')

  const handleSearch = async () => {
    const postIds = searchInput ? searchInput.split(',').map(val => Number(val)) : []
    let posts: Post[] = []
    dispatch(setIsError(false))
    dispatch(setisLoading(true))
    try {
      if (postIds.length) {
        const requests = postIds.map(id => fetchSomePosts(id))
        posts = await Promise.all(requests)
      } else {
        posts = await fetchAllPosts()
      }
      dispatch(setPosts(posts))
    } catch {
      dispatch(setIsError(true))
    } finally {
      dispatch(setisLoading(false))
    }
  }

  const fetchSomePosts = async (id: number): Promise<Post> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data: Post = await res.json()
    if (!data.id) {
      throw new Error(`failed to fetch posts #${id}`)
    }
    return data
  }

  const fetchAllPosts = async (): Promise<Post[]> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data: Post[] = await res.json()
    if (!data.length) {
      throw new Error(`failed to fetch posts`)
    }
    return data
  }

  return (
    <div className="mb-4 flex gap-3 items-center justify-center">
      <input
        type="text"
        className='px-3 py-2 rounded shadow-lg border-2 border-gray-400 w-full'
        placeholder='1, 2, 3'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button
        className='text-white bg-blue-500 focus:bg-blue-700 rounded px-3 py-2'
        onClick={handleSearch}
      >
        { !searchInput.length ? 'Reset' : 'Search' }
      </button>
    </div>
  )
}