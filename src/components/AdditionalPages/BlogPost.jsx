import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, User } from 'lucide-react';
import axios from 'axios';

const BlogPost = () => {
  const { id } = useParams();  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://assignment11-beta.vercel.app/blog-posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error("Blog post fetch error:", err);
        setError("Failed to load blog post. It may not exist or server is down.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#422AD5] text-xl">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8 text-center">{error || "The blog post you're looking for doesn't exist."}</p>
        <Link 
          to="/blog" 
          className="flex items-center gap-2 text-[#422AD5] hover:text-[#351fa8] font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50/50 py-16 md:py-20 px-5 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-[#422AD5] hover:text-[#351fa8] mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back to all posts
        </Link>

     
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-[#422AD5] mb-6 leading-tight"
        >
          {post.title}
        </motion.h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-10">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {new Date(post.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {post.author || "BloodCare Team"}
          </div>
          <span className="text-sm">{post.readTime}</span>
        </div>

 
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed"
        >
          {post.content ? (
       
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
          ) : (
            <p className="text-gray-600 italic">Full content not available in this post.</p>
          )}
        </motion.div>

 
        <div className="mt-16 pt-10 border-t border-gray-200 text-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 bg-[#422AD5] text-white px-6 py-3 rounded-xl hover:bg-[#351fa8] transition"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Blog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;