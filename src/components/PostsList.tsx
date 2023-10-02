import { Post } from '@/lib/types'
import PostCard from '@/components/PostCard'

export default function PostsList({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col gap-3 items-center">
      {
        posts.map(post => <PostCard key={post.id} post={post} />)
      }
    </div>
  )
}