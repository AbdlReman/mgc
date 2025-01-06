import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from 'contentful';
import Header from "@/src/layout/headers/header";
import BreadcrumbArea from "@/src/common/breadcrumb-area";
import Footer from "@/src/layout/footers/footer";
import BlogDetailsArea from "./blog-details-area";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [popularFeeds, setPopularFeeds] = useState([]);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const client = createClient({
          space: '0yvsoqusgxrp',
          accessToken: 'D9d1wYcZXA713hP3qCXyPTt4HXfRznRFPOgxN1hQKDM',
        });

        if (slug) {
          const response = await client.getEntries({
            content_type: 'blog',
            'fields.slug': slug,
          });

          if (response.items.length > 0) {
            const blogData = response.items[0].fields;
            setBlog({
              title: blogData.title,
              thumbnail: blogData.thumbnail.fields.file.url,
              banner: blogData.banner.fields.file.url,
              date: blogData.date,
              description: blogData.description,
            });
          }
        }

        // Fetch latest blogs for popular feeds
        const popularResponse = await client.getEntries({
          content_type: 'blog',
          limit: 3,
          order: '-sys.createdAt',
        });

        const feeds = popularResponse.items.map(item => ({
          title: item.fields.title,
          thumbnail: item.fields.thumbnail.fields.file.url,
          date: item.fields.date,
          slug: item.fields.slug,
        }));

        setPopularFeeds(feeds);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogs();
  }, [slug]);

  // if (!blog) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <BreadcrumbArea acive_menu="Blog Details" title={blog.title} />
      <BlogDetailsArea blog={blog} popularFeeds={popularFeeds} />
      <Footer tp_border={true} />
    </>
  );
};

export default BlogDetails;


