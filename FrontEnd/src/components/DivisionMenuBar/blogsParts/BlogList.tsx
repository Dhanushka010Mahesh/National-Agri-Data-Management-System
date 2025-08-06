import React, { useState } from 'react';
import { Search, Filter, Eye, Heart, MessageCircle, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: {
    id: string;
    name: string;
    profilePicture: string;
  };
  createdAt: string;
  likeCount: number;
  viewCount: number;
  comments: Array<{
    id: string;
    content: string;
    userId: string;
    userName: string;
    userProfilePicture: string;
    createdAt: string;
  }>;
}

export const BlogList = () => {
  const [blogs] = useState<Blog[]>([
    {
      id: "199",
      title: "Modern Rice Farming Techniques",
      content: `
        <p>Rice farming has evolved significantly over the past decade. Modern techniques now include precision agriculture, drone monitoring, and sustainable water management.</p>
        <h2>Precision Agriculture</h2>
        <p>Using GPS-guided equipment, farmers can now plant, fertilize, and harvest with centimeter-level accuracy. This reduces waste and increases yield.</p>
        <h2>Drone Monitoring</h2>
        <p>Drones equipped with multispectral cameras can detect plant health issues before they're visible to the human eye.</p>
        <h2>Sustainable Water Management</h2>
        <p>Alternate wetting and drying technique can save up to 30% of water compared to continuous flooding, while maintaining or even increasing yields.</p>
      `,
      imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      author: {
        id: "1",
        name: "Sachin Perera",
        profilePicture: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
      },
      createdAt: "2023-04-15T09:00:00Z",
      likeCount: 45,
      viewCount: 230,
      comments: [
        {
          id: "101",
          content: "Great article! I'm implementing these techniques in my farm.",
          userId: "2",
          userName: "Kumara Silva",
          userProfilePicture: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
          createdAt: "2023-04-16T14:30:00Z"
        }
      ]
    },
    {
      id: "200",
      title: "Organic Fertilizer Benefits",
      content: `
        <p>Organic fertilizers provide numerous benefits for sustainable agriculture...</p>
      `,
      imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
      author: {
        id: "2",
        name: "Nimal Fernando",
        profilePicture: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
      },
      createdAt: "2023-04-10T10:30:00Z",
      likeCount: 32,
      viewCount: 156,
      comments: []
    },
    {
      id: "201",
      title: "Climate-Smart Agriculture",
      content: `
        <p>Climate change adaptation strategies for modern farming...</p>
      `,
      imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
      author: {
        id: "3",
        name: "Priya Wickramasinghe",
        profilePicture: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
      },
      createdAt: "2023-04-08T15:45:00Z",
      likeCount: 67,
      viewCount: 340,
      comments: []
    }
  ]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter size={20} />
          <span>Filter</span>
        </Button>
      </div>

      {/* Blog Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Blog Post</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-start space-x-3">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{blog.title}</h3>
                      <p className="text-sm text-gray-600">{truncateContent(blog.content)}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <img
                      src={blog.author.profilePicture}
                      alt={blog.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-900">{blog.author.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">{formatDate(blog.createdAt)}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>{blog.viewCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart size={14} />
                      <span>{blog.likeCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={14} />
                      <span>{blog.comments.length}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit size={14} />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}