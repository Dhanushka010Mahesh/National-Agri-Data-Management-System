
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About AgriConnect Sri Lanka</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting farmers, agricultural officers, and resources across Sri Lanka to build a sustainable farming ecosystem.
          </p>
        </div>
        
        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="card-hover">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                To revolutionize Sri Lanka's agricultural sector by creating a digital platform that connects all stakeholders, streamlines processes, and empowers farmers with access to information, resources, and support.
              </p>
              <p className="text-gray-700">
                We aim to improve efficiency, transparency, and communication between farmers and agricultural officers at all levels of governance.
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-primary">Our Vision</h2>
              <p className="text-gray-700 mb-4">
                A digitally transformed agricultural sector in Sri Lanka where farmers are empowered, agricultural officers are efficient, and resources are optimally utilized.
              </p>
              <p className="text-gray-700">
                We envision a future where data-driven decision-making leads to increased productivity, sustainability, and prosperity for Sri Lankan agriculture.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Sri Lanka Agriculture Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Sri Lankan Agriculture</h2>
          
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <img
                src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
                alt="Sri Lankan Rice Fields"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">A Rich Agricultural Heritage</h3>
              <p className="text-gray-700 mb-4">
                Sri Lanka has a rich agricultural heritage dating back over 2,500 years. The ancient irrigation systems and agricultural practices showcase the ingenuity and expertise of our ancestors.
              </p>
              <p className="text-gray-700">
                Today, agriculture contributes significantly to Sri Lanka's economy, employing about 30% of the workforce and contributing around 7% to the GDP. Rice, tea, coconut, rubber, and various fruits and vegetables are the main crops.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
              <img
                src="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3"
                alt="Sri Lankan Modern Farming"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Modern Challenges & Opportunities</h3>
              <p className="text-gray-700 mb-4">
                Sri Lankan agriculture faces challenges including climate change, water scarcity, land fragmentation, and market access. However, these challenges also present opportunities for innovation and growth.
              </p>
              <p className="text-gray-700">
                AgriConnect Sri Lanka aims to address these challenges by facilitating better communication between farmers and agricultural authorities, providing access to modern farming techniques, and creating a data-driven approach to agricultural planning and decision-making.
              </p>
            </div>
          </div>
        </div>
        
        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Key Features of AgriConnect</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Farmer Registration & Profiles</h3>
                <p className="text-gray-600">
                  Farmers can register on the platform, create profiles, and manage their personal and farm information. This helps agricultural officers better understand and serve their needs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Land & Cultivation Management</h3>
                <p className="text-gray-600">
                  Track and manage agricultural lands, including details about location, size, irrigation type, and current cultivation. Monitor cultivation cycles and crop histories.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Knowledge Sharing</h3>
                <p className="text-gray-600">
                  Access a rich repository of agricultural articles, best practices, and modern farming techniques through our blog section. Share experiences and learn from other farmers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-time Notifications</h3>
                <p className="text-gray-600">
                  Stay updated with real-time notifications about approval statuses, new agricultural policies, and important announcements from district and division officers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Data Analytics</h3>
                <p className="text-gray-600">
                  Agricultural officers can access data analytics and visual representations of farmer distributions, land usage, and cultivation patterns to make informed decisions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Administrative Hierarchy</h3>
                <p className="text-gray-600">
                  Our platform respects and digitizes the existing administrative structure with division officers, district officers, and head officers, facilitating smooth workflow and approvals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Join AgriConnect Sri Lanka</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Be part of the agricultural transformation in Sri Lanka. Register today to connect with agricultural officers, manage your lands, and access valuable resources.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/register">Register Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
