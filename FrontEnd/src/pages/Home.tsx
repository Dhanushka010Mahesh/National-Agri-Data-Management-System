import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Leaf,
  MapPin,
  Phone,
  Smartphone,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "./blogs/Api";

const Home: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const handleBlogClick = (blogId: number) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-black relative overflow-hidden">
        {/* Agricultural Background Images */}
        <div className="absolute inset-0">
          {/* Paddy Field Background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          {/* Trees Overlay */}
          <div
            className="absolute bottom-0 left-0 w-full h-1/2 opacity-15"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86')`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          {/* Crop Fields */}
          <div
            className="absolute top-0 right-0 w-1/2 h-1/2 opacity-10"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1615729947596-a598e5de0ab3')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          {/* Leafy Patterns */}
          <div className="absolute top-10 left-10 w-32 h-32 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full text-green-400">
              <path d="M50 10 Q70 30 50 50 Q30 30 50 10" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-20 right-20 w-24 h-24 opacity-15 rotate-45">
            <svg viewBox="0 0 100 100" className="w-full h-full text-green-300">
              <path d="M50 10 Q70 30 50 50 Q30 30 50 10" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute top-1/3 right-10 w-20 h-20 opacity-10 -rotate-12">
            <svg viewBox="0 0 100 100" className="w-full h-full text-green-500">
              <path d="M50 10 Q70 30 50 50 Q30 30 50 10" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-green-500 rounded-full opacity-10 animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-80 h-80 bg-green-400 rounded-full opacity-5 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-green-500/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-green-500/10 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300">
                <Leaf className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight" onClick={logout}>
              <span className="text-green-400">Agri</span>Connect
            </h1>

            <h2 className="text-2xl md:text-3xl text-green-300 mb-8 font-light">
              ගොවි සමාජයේ ඩිජිටල් පරිණාමය
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              ශ්‍රී ලංකාවේ ගොවීන්ට නවීන කෘෂිකර්ම තාක්‍ෂණය, විශේෂඥ උපදේශන සහ ගොවි
              නිලධාරීන් සමග සම්බන්ධතාවය ලබා දෙන ප්‍රමුඛතම ඩිජිටල් වේදිකාව
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">5,000+</div>
                <div className="text-white/70">ගොවීන්</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">25</div>
                <div className="text-white/70">දිස්ත්‍රික්ක</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">500+</div>
                <div className="text-white/70">ගොවි නිලධාරීන්</div>
              </div>
            </div>

            {/* CTA Buttons */}
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 group"
                >
                  <Link to="/register" className="flex items-center">
                    මම ගොවියෙකි - ආරම්භ කරමු
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8 py-4 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Link to="/login">ගොවි නිලධාරියෙකි</Link>
                </Button>
              </div>
            )}

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-green-500 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-green-500 to-transparent"></div>
        <div className="absolute bottom-1/4 right-8 w-px h-24 bg-gradient-to-b from-green-500 to-transparent"></div>
      </div>

      {/* Features Section - Farmer Focused */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ගොවීන්ට විශේෂ පහසුකම්
            </h2>
            <p className="text-xl text-gray-600">
              AgriConnect සමඟ ඔබේ ගොවිතැන වඩාත් ලාභදායක කරගන්න
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">
                  ගොවි නිලධාරීන් සමඟ සම්බන්ධතාවය
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  ඔබේ ප්‍රාදේශීය සහ දිස්ත්‍රික් ගොවි නිලධාරීන් සමඟ සෘජුවම
                  සම්බන්ධ වී උපදේශන ලබා ගන්න. ගැටලු විසඳා ගැනීමට ක්‍ෂණික සහාය
                  ලබා ගන්න.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">
                  ඔබේ ගොවිබිම් කළමනාකරණය
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  ඔබේ සියළුම ගොවිබිම් ලියාපදිංචි කර ගන්න. වගා කරන භෝග, වගා කාලීන
                  චක්‍ර සහ අස්වැන්න පිළිබඳ සම්පූර්ණ වාර්තා තබා ගන්න.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">
                  නවීන ගොවිතැන් ක්‍රම
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  නවීන කෘෂිකර්ම ක්‍රම, රෝග හා පෝෂක කළමනාකරණය, බීජ තෝරා ගැනීම සහ
                  වෙළඳපොළ තොරතුරු ලබා ගන්න.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
                  <Smartphone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">
                  දුරකථන මගින් පහසු ප්‍රවේශය
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  ඔබේ ස්මාර්ට් ෆෝන් එක මගින් ඕනෑම වේලාවක, ඕනෑම තැනකින්
                  AgriConnect වේදිකාවට ප්‍රවේශ වන්න.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">
                  වෙළඳපොළ මිල ගණන්
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  දිනපතා වෙළඳපොළ මිල ගණන්, අස්වැන්න අලෙවි කරන ස්ථාන සහ හොඳම මිල
                  ගණන් ලබා ගැනීමේ ක්‍රම දැන ගන්න.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">
                  සහතික සහ ප්‍රාග්ධනය
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  කෘෂිකර්ම සහතික, ගොවි ණය, ප්‍රදාන සහ ආධාර වැඩසටහන් පිළිබඳ
                  සම්පූර්ණ තොරතුරු ලබා ගන්න.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              සාර්ථක ගොවීන්ගේ කථා
            </h2>
            <p className="text-xl text-gray-600">
              AgriConnect භාවිතා කර ඔවුන්ගේ ගොවිතැන සාර්ථක කරගත් ගොවීන්
            </p>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-12">
            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading blogs...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                  Error loading blogs
                </h2>
                <p className="text-gray-600">
                  Failed to fetch blog posts. Please try again later.
                </p>
              </div>
            )}

            {blogs && blogs.length === 0 && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  No blogs found
                </h2>
                <p className="text-gray-600">
                  Check back later for new content!
                </p>
              </div>
            )}

            {blogs && blogs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <Card
                    key={blog.id}
                    className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer group"
                    onClick={() => handleBlogClick(blog.id)}
                  >
                    <img
                      src={blog.imgURL}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          Blog
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {blog.content}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold">{blog.creator}</div>
                            <div className="text-sm text-gray-500">Author</div>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
                alt="Rice Farming Success"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">කුරුණෑගල දිස්ත්‍රික්කය</span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">සාර්ථකත්වය</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">සුනිල් ගුණරත්න - ගම්මුල්ල</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  "AgriConnect මගින් නවීන වී වගා ක්‍රම ඉගෙන ගෙන මගේ අස්වැන්න 40%කින් වැඩි කරගත්තා. ගොවි නිලධාරීන් සමඟ කතා කරන්න පුළුවන් වීම හරිම වටිනවා."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">SG</span>
                  </div>
                  <div>
                    <div className="font-semibold">සුනිල් ගුණරත්න</div>
                    <div className="text-sm text-gray-500">වී ගොවියා - 15 අවුරුදු පළපුරුද්ද</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843"
                alt="Vegetable Farming Success"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">නුවරඑළිය දිස්ත්‍රික්කය</span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">සාර්ථකත්වය</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">ප්‍රියංකා වීරසේකර - නානු ඔය</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  "එළවළු වගාවේ රෝග පාලනය ගැන හොඳ උපදේශන මිලට මිල ගණන් දැන ගන්න පුළුවන් වුණා. දැන් මගේ එළවළු කොළඹ වෙළඳපොළට යවනවා."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">PW</span>
                  </div>
                  <div>
                    <div className="font-semibold">ප්‍රියංකා වීරසේකර</div>
                    <div className="text-sm text-gray-500">එළවළු ගොවියා - 8 අවුරුදු පළපුරුද්ද</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3"
                alt="Coconut Farming Success"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">ගම්පහ දිස්ත්‍රික්කය</span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">සාර්ථකත්වය</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">චමින්ද රත්නායක - මීගමුව</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  "පොල් වගාවේ නවීන ක්‍රම ගැන ඉගෙන ගෙන පොල් වැඩිපුර අස්වැන්න අරගත්තා. දැන් පොල් තෙල් හදලා අලෙවි කරනවා. මාසයකට රුපියල් 50,000ක් වගේ ඉතිරි වෙනවා."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">CR</span>
                  </div>
                  <div>
                    <div className="font-semibold">චමින්ද රත්නායක</div>
                    <div className="text-sm text-gray-500">පොල් ගොවියා - 12 අවුරුදු පළපුරුද්ද</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-green-300">AgriConnect</span> සමඟ එකතු වන්න
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            ඔබේ ගොවිබිම් කළමනාකරණය කරන්න, ගොවි නිලධාරීන් සමඟ සම්බන්ධ වන්න, සහ
            නවීන කෘෂිකර්ම තාක්‍ෂණයෙන් ප්‍රයෝජන ගන්න. ඔබේ ගොවිතැන වඩාත් ලාභදායක
            කරගන්න.
          </p>
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <Button
                asChild
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Link to="/register" className="flex items-center">
                  නොමිලේ ලියාපදිංචි වන්න
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </Button>
              <Link
                to="/login"
                className="text-white/80 hover:text-green-300 text-lg transition-colors duration-200 underline decoration-green-300"
              >
                දැනටමත් ගිණුමක් ඇත? ඇතුළු වන්න
              </Link>
            </div>
          )}

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-green-700/50">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12 text-white/70">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>ක්‍ෂණික සහාය: 1920</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>5,000+ ගොවීන් විශ්වාස කරන</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                <span>කෘෂිකර්ම අමාත්‍යාංශයේ අනුමැතිය</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
