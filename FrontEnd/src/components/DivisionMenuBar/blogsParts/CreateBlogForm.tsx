import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ImageIcon, Save, Eye } from 'lucide-react';

export const CreateBlogForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    author: 'Current User'
  });
  const [preview, setPreview] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating blog post:', formData);
    // Add API call here to create the blog post
    
    // Reset form after submission
    setFormData({
      title: '',
      content: '',
      imageUrl: '',
      author: 'Current User'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Create New Blog Post</CardTitle>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPreview(!preview)}
                className="flex items-center space-x-2"
              >
                <Eye size={16} />
                <span>{preview ? 'Edit' : 'Preview'}</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!preview ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Blog Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter blog title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Featured Image URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  />
                  <Button type="button" variant="outline" size="icon">
                    <ImageIcon size={16} />
                  </Button>
                </div>
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Blog Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your blog content here... You can use HTML tags for formatting."
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  className="min-h-[300px]"
                  required
                />
                <p className="text-sm text-gray-500">
                  You can use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, etc. for formatting.
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button type="submit" className="flex items-center space-x-2">
                  <Save size={16} />
                  <span>Publish Blog</span>
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.title || 'Blog Title'}</h1>
                <p className="text-gray-600">By {formData.author} • {new Date().toLocaleDateString()}</p>
              </div>
              
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: formData.content || '<p>Blog content will appear here...</p>' 
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
