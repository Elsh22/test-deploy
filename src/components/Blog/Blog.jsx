'use client';
import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'

const Blog = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${STRAPI_URL}/api/blogs?populate=*`);
        const data = await response.json();
        // Only take the first 3 blogs
        setBlogs((data.data || []).slice(0, 3));
      } catch (error) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -400 : 400;
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const formatDate = (dateStr) => {
    try {
      return format(new Date(dateStr), 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date unavailable';
    }
  };

  const getImageUrl = (blog) => {
    try {
      if (!blog?.ThumbnailImage?.url) {
        return '/api/placeholder/400/200';
      }
      return `${STRAPI_URL}${blog.ThumbnailImage.url}`;
    } catch (error) {
      console.error('Error getting image URL:', error);
      return '/api/placeholder/400/200';
    }
  };

  if (loading) {
    return <div className="py-12 px-4 text-center">Loading blogs...</div>;
  }

  if (error) {
    return <div className="py-12 px-4 text-center text-red-500">{error}</div>;
  }

  if (!blogs || blogs.length === 0) {
    return <div className="py-12 px-4 text-center">No blogs found.</div>;
  }

  return (
    <section className="py-12 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest News & Insights</h2>
          <a href="/blog">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group">
              View All News
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
              <div className="p-0">
                <div className="relative w-full h-[200px]">
                <Image
                    src={getImageUrl(blog)}
                    alt={blog.Title || 'Blog post'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {blog.TypeofArticle || 'Article'}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{blog.Date ? formatDate(blog.Date) : 'No date'}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{blog.Title || 'Untitled'}</h3>
                  <p className="text-gray-600 line-clamp-2 mb-4">
                    {blog.ArticleContent || 'No content available'}
                  </p>
                  <Link href={`/blog/${blog.Slug}`}>
                    <button 
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;