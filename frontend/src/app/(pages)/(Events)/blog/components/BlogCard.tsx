"use client";
import { Clock } from 'lucide-react';
import Link from 'next/link';
import { Blog } from '../utils/types';
import { formatDate, getImageUrl } from '../utils/formatters';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link 
      href={`/blog/${blog.Slug}`}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:translate-y-[-4px] transition-transform duration-200"
    >
      <div className="relative h-48">
        <img
          src={getImageUrl(blog)}
          alt={blog.Title || 'Blog post'}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="text-sm text-blue-600 mb-2">{blog.TypeofArticle}</div>
        <h3 className="text-xl font-bold mb-3">{blog.Title}</h3>
        <div className="text-gray-600 mb-4">
          <p className="line-clamp-3">{blog.ArticleContent}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {formatDate(blog.Date)}
          </div>
          <div className="flex items-center">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
              {blog.Tags}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;