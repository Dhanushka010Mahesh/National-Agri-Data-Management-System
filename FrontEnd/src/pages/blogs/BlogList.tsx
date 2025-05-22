
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Blog } from "@/types";
import { getMockBlogs } from "@/services/mockData";
import { Search } from "lucide-react";

const BlogList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const blogs = getMockBlogs();
  
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Agricultural Insights</h1>
        
        {/* Search Bar */}
        <div className="relative max-w-md mb-8">
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
        </div>
        
        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No blogs found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Card className="card-hover overflow-hidden">
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              {blog.viewCount}
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              {blog.likeCount}
            </span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{blog.title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">
          {blog.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={blog.author.profilePicture || "https://images.unsplash.com/photo-1582562124811-c09040d0a901"}
              alt={blog.author.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm">{blog.author.name}</span>
          </div>
          <Button asChild size="sm" variant="ghost">
            <Link to={`/blogs/${blog.id}`}>Read More</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogList;
