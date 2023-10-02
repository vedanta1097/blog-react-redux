import { Post } from '@/lib/types'

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className='flex flex-col gap-1 px-3 py-2 rounded bg-gray-300 shadow-lg min-w-min max-w-lg'>
      <div className='font-bold'>
        #{ post.id } { post.title }
      </div>
      <div className='text-gray-700'>
        { post.body }
      </div>
    </div>
  )
}