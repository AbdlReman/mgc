import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import PopularFeeds from '../popular-feeds';

const BlogDetailsArea = ({ blog, popularFeeds }) => {
  // Render rich text content
  const richTextContent = documentToReactComponents(blog.description);

  return (
    <>
      <div className="postbox__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            {/* Left side */}
            <div className="col-xxl-9 col-xl-9 col-lg-8 col-12">
              <div className="postbox__wrapper pr-50 mr-30">
                <div className="postbox__border">
                  <article className="postbox__item format-stander mb-30 transition-3">
                    <div className="postbox__thumb p-relative mb-30">
                      <img src={blog.thumbnail} alt="Blog Thumbnail" />
                    </div>
                    <div className="postbox__content postbox__content-single">
                      <div className="postbox__meta mb-25">
                        <span>
                          <i className="fal fa-user"></i> Admin
                        </span>
                        <span>
                          <i className="fal fa-calendar-alt"></i> {new Date(blog.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="postbox__title">{blog.title}</h3>
                      <div className="postbox__text-single">{richTextContent}</div>
                    </div>
                  </article>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="col-xxl-3 col-xl-3 col-lg-4 col-12">
              <div className="sidebar__wrapper">
                {/* Pass popular feeds data */}
                <PopularFeeds feeds={popularFeeds} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsArea;

