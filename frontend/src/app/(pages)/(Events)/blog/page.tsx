"use client";
import { useState, useEffect } from 'react';
import FeaturedPost from './sections/FeaturedPost';
import SearchAndFilter from './sections/SearchAndFilter';
import BlogGrid from './sections/BlogGrid';
import GetFeatured from './sections/GetFeatured';
import SubmissionModal from './sections/SubmissionModal';
import { Blog } from './utils/types';

const POSTS_PER_PAGE = 6;

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [categories, setCategories] = useState(['all']);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
        const response = await fetch(`${STRAPI_URL}/api/blogs?populate=*`);
        const data = await response.json();
        setBlogs(data.data || []);
        
        const categorySet = new Set(['all']);
        data.data?.forEach((blog: { TypeofArticle: string; }) => {
          if (blog.TypeofArticle) {
            categorySet.add(blog.TypeofArticle);
          }
        });
        setCategories(Array.from(categorySet));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'all' || blog.TypeofArticle === selectedCategory;
    const matchesSearch = blog.Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.ArticleContent?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.Tags?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dmc-pearl">
        <div className="animate-pulse text-xl text-dmc-warm-brown heading-dmc-secondary">Loading blogs...</div>
      </div>
    );
  }

  const featuredPost = blogs[0];

  return (
    <div className="bg-dmc-white min-h-screen">
      {featuredPost && <FeaturedPost post={featuredPost} />}

      <SearchAndFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <BlogGrid
        blogs={filteredBlogs}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        POSTS_PER_PAGE={POSTS_PER_PAGE}
      />

      <GetFeatured setShowSubmissionModal={setShowSubmissionModal} />

      <SubmissionModal
        showModal={showSubmissionModal}
        setShowModal={setShowSubmissionModal}
      />
    </div>
  );
};

export default BlogPage;