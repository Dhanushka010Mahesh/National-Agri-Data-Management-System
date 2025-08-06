
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Search, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "./Api";
import { useNavigate } from "react-router-dom";

const BlogList: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const handleBlogClick = (blogId: number) => {
    navigate(`/blog/${blogId}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Agricultural Insights</h1>
        
        {/* Search Bar */}
        {/* <div className="relative max-w-md mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search blogs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading blogs...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                  Error loading blogs
                </h2>
                <p className="text-gray-600">
                  Failed to fetch blog posts. Please try again later.
                </p>
              </div>
            )}

            {blogs && blogs.length === 0 && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  No blogs found
                </h2>
                <p className="text-gray-600">
                  Check back later for new content!
                </p>
              </div>
            )}

            {blogs && blogs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <Card
                    key={blog.id}
                    className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer group"
                    onClick={() => handleBlogClick(blog.id)}
                  >
                    <img
                      src={blog.imgURL}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          Blog
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {blog.content}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold">{blog.creator}</div>
                            <div className="text-sm text-gray-500">Author</div>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
      </div>
    </div>
  );
};


export default BlogList;
