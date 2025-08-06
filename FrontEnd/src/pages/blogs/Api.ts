
const API_BASE_URL = 'http://localhost:8080/api/v1';

export interface Blog {
  id: number;
  title: string;
  content: string;
  imgURL: string;
  createdAt: string;
  creator: string;
}

export const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${API_BASE_URL}/blogs/get`);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
};
export const fetchBlogById = async (id: string): Promise<Blog> => {
  console.log('Fetching blog with ID:', id);
  const url = `http://localhost:8080/api/v1/blogs/get/${id}`;
  console.log('API URL:', url);
  
  try {
    const response = await fetch(url);
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Blog data received:', data);
    return data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
};

