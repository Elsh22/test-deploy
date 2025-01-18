"use client";
import Link from 'next/link';
import { Clock, User } from 'lucide-react';
import { Blog } from '../utils/types';
import { formatDate, getImageUrl } from '../utils/formatters';
import Image from 'next/image'


interface FeaturedPostProps {
  post: Blog;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  if (!post) return null;

  return (
    <section className="relative h-[70vh]">
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(post)}
          alt={post.Title || 'Featured post'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="max-w-4xl text-white text-center">
          <div className="mb-4 text-blue-400 font-medium">
            Featured Post
          </div>
          <h1 className="text-5xl font-bold mb-6">{post.Title}</h1>
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {formatDate(post.Date)}
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              {post.TypeofArticle}
            </div>
          </div>
          <Link href={`/blog/${post.Slug}`}>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
              Read Article
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;