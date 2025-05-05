
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                AgriConnect Sri Lanka
              </h1>
              <p className="text-xl text-primary-light mb-8">
                Connecting farmers, officers, and agricultural resources across Sri Lanka
              </p>
              {!isAuthenticated && (
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/register">Register Now</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
                    <Link to="/login">Login</Link>
                  </Button>
                </div>
              )}
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
                alt="Sri Lankan Rice Field"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Connect with Officers</h3>
                <p className="text-gray-600 text-center">
                  Direct communication with division and district agricultural officers for support and guidance.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Land Management</h3>
                <p className="text-gray-600 text-center">
                  Register and manage agricultural lands with detailed information about cultivation cycles.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Agricultural Insights</h3>
                <p className="text-gray-600 text-center">
                  Access valuable blogs, articles, and data about modern farming techniques and best practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Recent Blogs Preview */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recent Agricultural Insights</h2>
            <Button asChild variant="link">
              <Link to="/blogs">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
                alt="Rice Farming"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Apr 15, 2023</span>
                  <span className="text-sm text-gray-500">Views: 230</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 line-clamp-1">Modern Rice Farming Techniques</h3>
                <p className="text-gray-600 mb-3 line-clamp-2">
                  Rice farming has evolved significantly over the past decade. Modern techniques now include precision agriculture...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1582562124811-c09040d0a901"
                      alt="Author"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm">Sachin Perera</span>
                  </div>
                  <Button size="sm" variant="ghost">Read More</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843"
                alt="Organic Farming"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Apr 12, 2023</span>
                  <span className="text-sm text-gray-500">Views: 186</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 line-clamp-1">Organic Vegetable Growing Guide</h3>
                <p className="text-gray-600 mb-3 line-clamp-2">
                  Growing organic vegetables in Sri Lanka's tropical climate presents unique challenges and opportunities...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                      alt="Author"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm">Amali Fernando</span>
                  </div>
                  <Button size="sm" variant="ghost">Read More</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3"
                alt="Coconut Cultivation"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Apr 10, 2023</span>
                  <span className="text-sm text-gray-500">Views: 145</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 line-clamp-1">Sustainable Coconut Cultivation</h3>
                <p className="text-gray-600 mb-3 line-clamp-2">
                  Coconut is one of Sri Lanka's most important crops. Here's how to cultivate it sustainably...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1517022812141-23620dba5c23"
                      alt="Author"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm">Nimal Jayasinghe</span>
                  </div>
                  <Button size="sm" variant="ghost">Read More</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join AgriConnect Today
          </h2>
          <p className="text-xl text-primary-light mb-8 max-w-2xl mx-auto">
            Be part of Sri Lanka's growing agricultural community. Register now to manage your lands, get support from officers, and access valuable resources.
          </p>
          {!isAuthenticated && (
            <Button asChild size="lg" variant="secondary">
              <Link to="/register">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
