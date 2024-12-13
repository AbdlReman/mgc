
import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import Link from 'next/link';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
  
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const client = createClient({
                    space: "0yvsoqusgxrp",
                    accessToken: "D9d1wYcZXA713hP3qCXyPTt4HXfRznRFPOgxN1hQKDM",
                });

                const response = await client.getEntries({
                    content_type: 'blog', // Replace with your Content Type ID
                    order: '-fields.date', // Orders blogs by date, descending
                    limit: 4 // Fetch the latest 4 blogs
                });

                setBlogs(response.items);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);
  
    return (
        <>
            <div className="tp-app-blog ha-blog  pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title-wraper">
                                <div className="tp-section text-center">
                                    <span className="tp-section__subtitle mb-15 shadow-none text-grey p-0 wow tpfadeUp">News</span>
                                    <h2 className="tp-section__title mb-45 wow tpfadeUp" data-wow-delay=".3s">Blog &amp; Insights</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {blogs.map((item, i) => (
                            <div key={i} className="col-xxl-3 col-xl-4 col-lg-6">
                                <div className="it-blog app-blog mb-30 wow tpfadeUp" data-wow-delay={item.fields.delay}>
                                    <div className="it-blog__thumb w-img">
                                        <div className="fix">
                                            <img
                                                src={item.fields.thumbnail.fields.file.url}
                                                alt={item.fields.title}
                                            />
                                        </div>
                                    </div>

                                    <div className="it-blog-info app-blog-info white-bg">
                                        <div className="it-blog__meta">
                                            <span>
                                                {/* <a href="#">
                                                    <b className="it-blog-cta">{item.fields.category}</b>
                                                </a> */}
                                            </span>
                                            <span>
                                                <Link href={`/blog/${item.fields.slug}`}>
                                                   <b>{item.fields.date}</b>
                                                </Link>
                                            </span>
                                        </div>
                                        <h3 className="it-blog__title fz-20 text-mirage">
                                            <Link href={`/blog/${item.fields.slug}`}>
                                                {item.fields.title}
                                            </Link>
                                        </h3>
                                        <Link href={`/blog/${item.fields.slug}`} className="blog-btn">
                                            Read More
                                            <span className="pl-10">
                                                <i className="fal fa-long-arrow-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row">
               <div className="col-12">
                  <div className="project-more-btn">
                     <Link href="/blog" className="tp-common-btn tp-btn-hover alt-color">more Blogs
                        <span>
                           <i className="fal fa-long-arrow-right"></i>
                           <i className="fal fa-long-arrow-right"></i>
                        </span>
                        <b></b>
                     </Link>
                  </div>
               </div>
            </div>
                </div>
            </div>
        </>
    );
};

export default Blog;