import BreadcrumbArea from "@/src/common/breadcrumb-area";
import Footer from "@/src/layout/footers/footer";
import Header from "@/src/layout/headers/header";
import React, { useEffect, useState } from "react";
import BlogArea from "./blog-area";
import { createClient } from "contentful";
import { useRouter } from 'next/router';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const { page = 1 } = router.query;  // Get current page from URL

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const client = createClient({
          space: "0yvsoqusgxrp",
          accessToken: "D9d1wYcZXA713hP3qCXyPTt4HXfRznRFPOgxN1hQKDM",
        });

        const limit = 6;  // Number of blogs per page
        const skip = (page - 1) * limit;  // Skip blogs based on page

        const response = await client.getEntries({
          content_type: "blog",  // Content type in Contentful
          limit: limit,
          skip: skip,
        });

        const blogData = response.items.map((item) => ({
          img: item.fields.thumbnail.fields.file.url,
          date: new Date(item.fields.date).toLocaleDateString("en-US", { day: "numeric" }),
          month: new Date(item.fields.date).toLocaleDateString("en-US", { month: "short" }),
          title: item.fields.title,
          slug: item.fields.slug,
        }));

        setBlogs(blogData);
        setTotalPages(Math.ceil(response.total / limit));  // Calculate total pages
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [page]);  // Fetch blogs when the page changes

  return (
    <>
      <Header />
      <BreadcrumbArea acive_menu="Blog" title="News & Feeds" />
      <BlogArea blogs={blogs} currentPage={parseInt(page)} totalPages={totalPages} />
      <Footer tp_border={true} />
    </>
  );
};

export default Blog;
