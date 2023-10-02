import { Post, HomeProps } from '@/lib/types'
import PostsList from '@/components/PostsList'

export default function Home({ posts, isError }: HomeProps) {
  return (
    <main className="container mx-auto mt-6">
      <h1 className="text-xl font-bold text-center mb-8">
        Welcome to My Blog
      </h1>

      {/* <SearchInput /> */}

      { isError
        ? <div className='text-center text-gray-700'>Failed to fetch blog posts</div>
        : <PostsList posts={posts} />
      }
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
