import Link from "next/link";
import React from "react";

const PopularFeeds = ({ feeds = [] }) => {
  if (feeds.length === 0) {
    return (
      <div className="sidebar__widget mb-40">
        <h3 className="sidebar__widget-title">Popular Feeds</h3>
        <div className="sidebar__widget-content">
          <p>No popular feeds available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar__widget mb-40">
      <h3 className="sidebar__widget-title">Popular Feeds</h3>
      <div className="sidebar__widget-content">
        <div className="sidebar__post rc__post">
          {feeds.map((feed, i) => (
            <div key={i} className="rc__post mb-20 d-flex align-items-center">
              <div className="rc__post-thumb mr-20">
                <Link href={`/blog/${feed.slug}`}>
                  <img
                    src={feed.thumbnail}
                    alt={feed.title || "popular-feed"}
                    style={{ width: "90px", height: "70px" }}
                  />
                </Link>
              </div>
              <div className="rc__post-content">
                <h3 className="rc__post-title">
                  <Link href={`/blog/${feed.slug}`}>{feed.title}</Link>
                </h3>
                <div className="rc__meta">
                  <span>
                    <i className="fal fa-calendar-alt"></i>{" "}
                    {new Date(feed.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularFeeds;
