
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact: React.FC = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We've received your message and will respond soon.",
    });
    // Reset the form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team for inquiries, support, or feedback about the AgriConnect platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <Card className="card-hover">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Enter your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter subject" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here..." rows={5} required />
                </div>
                
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
          
          {/* District Office Contact Details */}
          <div>
            <h2 className="text-2xl font-bold mb-6">District Agricultural Offices</h2>
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
              {districtOffices.map((office) => (
                <Card key={office.district} className="card-hover">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-primary">{office.district} District</h3>
                    <p className="text-gray-700 mt-2">{office.address}</p>
                    <div className="mt-3 space-y-1">
                      <p className="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        {office.phone}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        {office.email}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* Head Office Details */}
        <Card className="card-hover mb-16">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-bold mb-4">Head Office</h2>
                <p className="text-gray-700 mb-4">
                  Ministry of Agriculture<br />
                  80/5, Govijana Mandiraya<br />
                  Rajamalwatta Avenue<br />
                  Battaramulla, Sri Lanka
                </p>
                <div className="space-y-2">
                  <p className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    +94 11 2869553
                  </p>
                  <p className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    info@agriconnect.gov.lk
                  </p>
                  <p className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                    www.agriconnect.gov.lk
                  </p>
                </div>
              </div>
              <div className="md:w-1/3">
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map Placeholder</p>
                  {/* In a real app, you would integrate Google Maps here */}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">How do I register as a farmer?</h3>
                <p className="text-gray-700">
                  You can register by clicking the "Register" button in the navigation menu, filling out the required information, and submitting the form. Your registration will be reviewed by a Division Officer.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">How can I add my land details?</h3>
                <p className="text-gray-700">
                  After registering and logging in, navigate to the "Land Details" section from your profile menu. Click on "Add New Land" and fill in the required information about your land.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Who approves my land and cultivation details?</h3>
                <p className="text-gray-700">
                  Your division's Agricultural Officer reviews and approves land registrations and cultivation entries. You will receive notifications when your submissions are approved.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">How can I contact my Division Officer?</h3>
                <p className="text-gray-700">
                  Division Officer contact details are available in the Contact page. You can also send messages through the platform once you're registered.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock district office data
const districtOffices = [
  {
    district: "Colombo",
    address: "123 Main Street, Colombo 05",
    phone: "+94 11 2123456",
    email: "colombo@agriconnect.gov.lk"
  },
  {
    district: "Gampaha",
    address: "456 Farm Road, Gampaha",
    phone: "+94 33 2258741",
    email: "gampaha@agriconnect.gov.lk"
  },
  {
    district: "Kalutara",
    address: "789 Rice Lane, Kalutara",
    phone: "+94 34 2235689",
    email: "kalutara@agriconnect.gov.lk"
  },
  {
    district: "Kandy",
    address: "101 Hill Street, Kandy",
    phone: "+94 81 2345678",
    email: "kandy@agriconnect.gov.lk"
  },
  {
    district: "Matale",
    address: "202 Spice Road, Matale",
    phone: "+94 66 2289456",
    email: "matale@agriconnect.gov.lk"
  },
  {
    district: "Nuwara Eliya",
    address: "303 Tea Gardens, Nuwara Eliya",
    phone: "+94 52 2215478",
    email: "nuwaraeliya@agriconnect.gov.lk"
  },
  {
    district: "Galle",
    address: "404 Coastal Road, Galle",
    phone: "+94 91 2245789",
    email: "galle@agriconnect.gov.lk"
  },
  {
    district: "Matara",
    address: "505 Beach Avenue, Matara",
    phone: "+94 41 2235896",
    email: "matara@agriconnect.gov.lk"
  },
  {
    district: "Hambantota",
    address: "606 Salt Street, Hambantota",
    phone: "+94 47 2256987",
    email: "hambantota@agriconnect.gov.lk"
  }
];

export default Contact;
