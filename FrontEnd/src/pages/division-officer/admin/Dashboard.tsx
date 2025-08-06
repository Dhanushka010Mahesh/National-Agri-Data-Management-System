import React from 'react';
import { Users, Map, Leaf, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';


export const DivisionDashboard = () => {
  const { user } = useAuth();
  const stats = [
    {
      title: 'Total Farmers',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Lands',
      value: '2,156',
      change: '+8%',
      trend: 'up',
      icon: Map,
      color: 'bg-green-500',
    },
    {
      title: 'Cultivated Area',
      value: '3,892 acres',
      change: '+15%',
      trend: 'up',
      icon: Leaf,
      color: 'bg-yellow-500',
    },
    {
      title: 'Pending Approvals',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: AlertCircle,
      color: 'bg-red-500',
    },
  ];

  // const recentActivities = [
  //   { id: 1, action: 'New farmer registration', farmer: 'Anil Rathnayake', time: '2 hours ago', status: 'pending' },
  //   { id: 2, action: 'Land cultivation approved', farmer: 'Priyani Mendis', time: '4 hours ago', status: 'approved' },
  //   { id: 3, action: 'Crop category updated', farmer: 'Sunil Gunasekara', time: '6 hours ago', status: 'completed' },
  //   { id: 4, action: 'Land ownership verified', farmer: 'Malani Fernando', time: '1 day ago', status: 'approved' },
  // ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back {user.name}! Here's an overview of division Dashboard.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp 
                    size={16} 
                    className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'} 
                  />
                  <span className={`text-sm ml-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">from last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'approved' ? 'bg-green-100' :
                    activity.status === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <CheckCircle size={16} className={
                      activity.status === 'approved' ? 'text-green-600' :
                      activity.status === 'pending' ? 'text-yellow-600' : 'text-blue-600'
                    } />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">Farmer: {activity.farmer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};