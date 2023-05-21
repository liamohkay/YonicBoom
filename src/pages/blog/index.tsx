import React from 'react';
import { api, RouterOutputs } from '~/utils/api';

type Blog = RouterOutputs['getBlogs'][number];
interface BlogPostProps {
  blog: Blog;
}

const Blog: React.FC = (): JSX.Element => {
  const blogs = api.getBlogs.useQuery().data;
  return (
    <>
      { blogs?.map((blog: Blog) => <BlogPost blog={blog} />)}
    </>
  )
}

const BlogPost: React.FC<BlogPostProps> = ({ blog }): JSX.Element => {
  return (
    <>
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        <a href="#">
            <img className="rounded-t-lg" src={blog.imageUrl} alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{blog.title}</h5>
            </a>
            <p className="font-normal text-gray-700 mb-3">{blog.description}</p>
            <pre className="font-sans max-w-fit">{blog.post}</pre>
            <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href="#">
                Read more
            </a>
        </div>
    </div>
    </>
  )
}

export default Blog;