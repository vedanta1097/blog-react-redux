export interface Post {
  userId: number,
  id: string,
  title: string,
  body: string,
}

export interface HomeProps {
  posts: Post[],
  isError: boolean,
}