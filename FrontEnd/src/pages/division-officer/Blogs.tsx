import React, { useState } from 'react';
import { BlogList } from '@/components/DivisionMenuBar/blogsParts/BlogList';
import { CreateBlogForm } from '@/components/DivisionMenuBar/blogsParts/CreateBlogForm';
import { Button } from '@/components/ui/button';
import { Plus, List } from 'lucide-react';

export const Blogs = () => {
  const [activeView, setActiveView] = useState<'list' | 'create'>('list');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600">Manage and create agricultural blog posts</p>
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={() => setActiveView('list')}
            variant={activeView === 'list' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <List size={16} />
            <span>Blog List</span>
          </Button>
          <Button
            onClick={() => setActiveView('create')}
            variant={activeView === 'create' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Create Blog</span>
          </Button>
        </div>
      </div>

      {activeView === 'list' ? <BlogList /> : <CreateBlogForm />}
    </div>
  );
};