import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } }
};

const child = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/blog-posts');
        setPosts(response.data);
      } catch (err) {
        console.error("Blog fetch error:", err);
        setError("Failed to load blog posts. Make sure backend is running on port 5000.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#422AD5] text-xl">Loading blog posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50/50 py-16 md:py-20 px-5 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-3xl md:text-4xl   font-bold text-center text-[#422AD5] mb-10 md:mb-14"
        >
          BloodCare Blog
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-center text-gray-600 mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          Insights, stories, and tips on blood donation, health, and community building.
        </motion.p>

        {posts.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 text-lg italic"
          >
            No blog posts available yet. Coming soon!
          </motion.p>
        ) : (
          <motion.div variants={container} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9">
            {posts.map((post, i) => (
              <motion.article
                key={post._id || i}
                variants={child}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#422AD5]/10 hover:border-[#422AD5]/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="h-48 bg-gradient-to-br from-[#422AD5]/10 to-gray-100 flex items-center justify-center">
                  <Newspaper className="w-16 h-16 md:w-20 md:h-20 text-[#422AD5]/40" strokeWidth={1.5} />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <Calendar className="w-5 h-5" />
                    {new Date(post.createdAt || post.date || Date.now()).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 line-clamp-2">
                    {post.title || "Untitled Post"}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow text-base md:text-lg line-clamp-3">
                    {post.excerpt || post.content?.substring(0, 150) + "..." || "No excerpt available"}
                  </p>
                  <div className="flex items-center justify-between text-sm mt-auto">
                    <span className="text-gray-500">{post.readTime || 'Read more'}</span>
                    <Link  to={`/blog/${post._id}`}   className="text-[#422AD5] font-medium flex items-center gap-2 hover:text-[#351fa8] transition">
                   Read More <ArrowRight className="w-5 h-5" />
                   </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        <motion.p
          variants={child}
          className="mt-12 md:mt-16 text-center text-lg md:text-xl text-gray-600 italic"
        >
          More educational articles and real donor stories coming soon...
        </motion.p>
      </div>
    </section>
  );
};

export default Blog;