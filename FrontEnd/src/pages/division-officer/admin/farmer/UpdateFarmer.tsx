import React from 'react';
import { Search, Filter, Edit, User, Phone, MapPin } from 'lucide-react';

export const UpdateFarmer = () => {
  const farmers = [
    { 
      id: 1, 
      name: 'Sunil Perera', 
      nic: '751234567V', 
      phone: '0771234567', 
      district: 'Colombo', 
      village: 'Kelaniya', 
      lastUpdated: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Kamala Silva', 
      nic: '681234567V', 
      phone: '0779876543', 
      district: 'Gampaha', 
      village: 'Negombo', 
      lastUpdated: '2024-01-10'
    },
    { 
      id: 3, 
      name: 'Ranjith Fernando', 
      nic: '721234567V', 
      phone: '0765432109', 
      district: 'Kalutara', 
      village: 'Panadura', 
      lastUpdated: '2024-01-08'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Update Farmer Information</h1>
          <p className="text-gray-600">Update and manage farmer details</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search farmers to update..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      {/* Farmers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIC</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {farmers.map((farmer) => (
              <tr key={farmer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <User size={16} className="text-gray-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{farmer.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {farmer.nic}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Phone size={14} className="mr-1" />
                    {farmer.phone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {farmer.village}, {farmer.district}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {farmer.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors">
                    <Edit size={14} />
                    <span>Update</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}