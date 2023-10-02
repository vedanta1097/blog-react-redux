import { Post, HomeProps } from '@/lib/types'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { useEffect } from 'react'
import { setPosts } from '@/store/postsSlice'
import PostsList from '@/components/PostsList'
import SearchInput from '@/components/SearchInput'

export default function Home(props: HomeProps) {
  const posts = useSelector((state: RootState) => state.posts.posts)
  const isLoading = useSelector((state: RootState) => state.posts.isLoading)
  const isError = useSelector((state: RootState) => state.posts.isError)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPosts(props.posts))
  }, [])

  const renderData = () => {
    if (isLoading) {
      return <div className='text-center text-gray-700'>Loading...</div>
    } else if (isError) {
      return <div className='text-center text-red-700'>Failed to fetch blog posts</div>
    } else {
      return <PostsList posts={posts} />
    }
  }

  return (
    <main className="container max-w-lg mx-auto mt-6">
      <h1 className="text-xl font-bold text-center mb-8">Welcome to My Blog</h1>
      <SearchInput />
      { renderData() }
    </main>
  )
}

export async function getServerSideProps() {
  const response: { props: HomeProps } = {
    props: {
      posts: [],
      isError: false,
    }
  }
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data: Post[] = await res.json()
    response.props.posts = data
    response.props.isError = false
    return response
  } catch {
    response.props.posts = []
    response.props.isError = true
    return response
  }
}
