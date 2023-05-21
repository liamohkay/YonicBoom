import React from 'react';
import { api } from '~/utils/api';

const Blog: React.FC = (): JSX.Element => {
  const blogs = api.getBlogs.useQuery().data;
  return (
    <>
      {JSON.stringify(blogs)}
    </>
  )
}

export default Blog;