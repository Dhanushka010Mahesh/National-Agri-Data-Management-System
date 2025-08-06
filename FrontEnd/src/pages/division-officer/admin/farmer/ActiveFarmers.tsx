import React from 'react';
import { Search, Filter, Edit, Eye } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const ActiveFarmers = () => {
  const { districtId, divisionId ,category} = useParams();
  console.log("<< "+districtId+" "+divisionId+" "+category+" >>");
  const farmers = [
    { id: 1, name: 'Sunil Perera', nic: '751234567V', phone: '0771234567', district: 'Colombo', village: 'Kelaniya', status: 'Active' },
    { id: 2, name: 'Kamala Silva', nic: '681234567V', phone: '0779876543', district: 'Gampaha', village: 'Negombo', status: 'Active' },
    { id: 3, name: 'Ranjith Fernando', nic: '721234567V', phone: '0765432109', district: 'Kalutara', village: 'Panadura', status: 'Active' },
    { id: 4, name: 'Priyani Mendis', nic: '801234567V', phone: '0712345678', district: 'Colombo', village: 'Maharagama', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Active Farmers</h1>
          <p className="text-gray-600">Manage active farmer registrations</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search farmers..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {farmers.map((farmer) => (
              <tr key={farmer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{farmer.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {farmer.nic}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {farmer.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {farmer.village}, {farmer.district}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {farmer.status}
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
