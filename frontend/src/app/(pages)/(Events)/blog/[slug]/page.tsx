import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Key } from 'react';

const BlogPost = async ({ params }) => {
  const { slug } = params;
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const res = await fetch(`${STRAPI_URL}/api/blogs?filters[Slug][$eq]=${slug}&populate=*`);
  const data = await res.json();

  if (!data.data || data.data.length === 0) {
    return <div>Blog post not found.</div>;
  }

  const blog = data.data[0];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/blog"
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 group transition-colors w-fit"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Articles
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{blog.Title}</h1>
          <div className="flex items-center text-gray-600">
            <time dateTime={blog.Date} className="text-sm mr-4">
              {format(new Date(blog.Date), 'MMMM d, yyyy')}
            </time>
            <span className="text-sm">{blog.TypeofArticle}</span>
          </div>
        </header>

        {blog.ThumbnailImage && (
          <img
            src={`${STRAPI_URL}${blog.ThumbnailImage.url}`}
            alt={blog.Title}
            className="w-full h-auto mb-8 rounded-lg shadow-md"
          />
        )}

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.ArticleContent }}
        />

        {blog.Tags && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap">
              {blog.Tags.split(',').map((tag: string, index: Key | null | undefined) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded mr-2 mb-2"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export async function generateStaticParams() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const res = await fetch(`${STRAPI_URL}/api/blogs`);
  const blogs = await res.json();

  return blogs.data.map((blog: { Slug: any; }) => ({
    slug: blog.Slug,
  }));
}

export default BlogPost;