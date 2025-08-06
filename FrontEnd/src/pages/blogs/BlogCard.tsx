import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import { Blog } from "@/pages/blogs/Api";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0">
      <img
        src={blog.imgURL}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center">
            <User className="mr-1 h-4 w-4" />
            {blog.creator}
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.content}
        </p>
        
        <Button 
          onClick={() => navigate(`/blog/${blog.id}`)}
          className="w-full bg-green-600 hover:bg-green-700 transition-colors"
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
