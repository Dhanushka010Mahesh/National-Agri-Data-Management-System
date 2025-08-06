import React from 'react';
import { Search, Filter, Edit, Eye, MapPin } from 'lucide-react';

export const ActiveLands = () => {
  const lands = [
    { 
      id: 1, 
      owner: 'Sunil Perera', 
      landId: 'L001', 
      size: '2.5 acres', 
      location: 'Kelaniya, Colombo', 
      cropType: 'Rice', 
      status: 'Active',
      season: 'Yala'
    },
    { 
      id: 2, 
      owner: 'Kamala Silva', 
      landId: 'L002', 
      size: '3.2 acres', 
      location: 'Negombo, Gampaha', 
      cropType: 'Vegetables', 
      status: 'Active',
      season: 'Maha'
    },
    { 
      id: 3, 
      owner: 'Ranjith Fernando', 
      landId: 'L003', 
      size: '1.8 acres', 
      location: 'Panadura, Kalutara', 
      cropType: 'Rice', 
      status: 'Active',
      season: 'Yala'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Active Lands</h1>
          <p className="text-gray-600">Manage active land registrations</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search lands..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      {/* Lands Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Land ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Season</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lands.map((land) => (
              <tr key={land.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{land.landId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {land.owner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {land.size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {land.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {land.cropType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {land.season}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {land.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye size={16} />
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    <Edit size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};