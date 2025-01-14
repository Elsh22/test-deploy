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
        
        const uniqueCategories = ['all', ...new Set(data.data?.map(blog => 
          blog.TypeofArticle
        ).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter and search functionality
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'all' || blog.TypeofArticle === selectedCategory;
    const matchesSearch = blog.Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.ArticleContent?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.Tags?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading blogs...</div>
      </div>
    );
  }

  const featuredPost = blogs[0];

  return (
    <div className="bg-white min-h-screen">
      {/* Featured Post Section */}
      {featuredPost && <FeaturedPost post={featuredPost} />}

      {/* Search and Filter Section */}
      <SearchAndFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Blog Grid Section */}
      <BlogGrid
        blogs={filteredBlogs}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        POSTS_PER_PAGE={POSTS_PER_PAGE}
      />

      {/* Get Featured Section */}
      <GetFeatured setShowSubmissionModal={setShowSubmissionModal} />

      {/* Submission Modal */}
      <SubmissionModal
        showModal={showSubmissionModal}
        setShowModal={setShowSubmissionModal}
      />
    </div>
  );
};

export default BlogPage;