"use client";
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { Blog } from '../utils/types';
import { formatDate, getImageUrl } from '../utils/formatters';
import Image from 'next/image'

interface BlogGridProps {
  blogs: Blog[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  POSTS_PER_PAGE: number;
}

const BlogGrid = ({ 
  blogs, 
  currentPage, 
  setCurrentPage, 
  POSTS_PER_PAGE 
}: BlogGridProps) => {
  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);
  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedBlogs.map((blog) => (
            <Link 
              href={`/blog/${blog.Slug}`} 
              key={blog.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:translate-y-[-4px] transition-transform duration-200"
            >
              <div className="relative h-48">
                <Image
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
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;