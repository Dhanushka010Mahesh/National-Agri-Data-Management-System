import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { fetchBlogById } from "@/pages/blogs/Api";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, User } from "lucide-react";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error loading blog</h1>
          <p className="text-gray-600 mb-4">Failed to load the blog post</p>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog not found</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate('/')} 
          variant="outline" 
          className="mb-6 hover:bg-green-50 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>

        <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl border-0">
          <img
            src={blog.imgURL}
            alt={blog.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <CardContent className="p-8">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                {blog.creator}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {blog.content}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogDetail;
