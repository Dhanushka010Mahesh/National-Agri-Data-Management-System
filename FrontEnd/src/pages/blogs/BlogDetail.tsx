
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getMockBlogById } from "@/services/mockData";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const blog = getMockBlogById(id || "");
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog?.likeCount || 0);
  
  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Not Found</h2>
          <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/blogs")}>Return to Blogs</Button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    if (!isAuthenticated) {
      toast("Please login to like this blog", {
        description: "You need to be logged in to interact with blogs",
      });
      return;
    }
    
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    toast(liked ? "Like removed" : "Blog liked", {
      description: liked ? "You've removed your like from this blog" : "You've liked this blog",
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast("Please login to comment", {
        description: "You need to be logged in to interact with blogs",
      });
      return;
    }
    
    if (!comment.trim()) {
      toast("Empty comment", {
        description: "Please write something before submitting",
      });
      return;
    }

    // In a real app, this would send the comment to the server
    toast("Comment submitted", {
      description: "Your comment has been added successfully",
    });
    
    setComment("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blog Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={blog.author.profilePicture} />
                <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{blog.author.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {blog.viewCount}
              </span>
              <Button 
                onClick={handleLike} 
                variant="ghost" 
                className="flex items-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 mr-1 ${liked ? "text-red-500" : "text-gray-500"}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                {likeCount}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>
        
        {/* Blog Content */}
        <div className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        {/* Comments Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Comments</h3>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <Textarea
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="mb-3"
            />
            <Button disabled={!isAuthenticated}>
              {isAuthenticated ? "Submit Comment" : "Login to Comment"}
            </Button>
          </form>
          
          {/* Comments List */}
          <div className="space-y-4">
            {blog.comments.length > 0 ? (
              blog.comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={comment.userProfilePicture} />
                        <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{comment.userName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-gray-700 mt-1">{comment.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 bg-gray-100 rounded-lg">
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
