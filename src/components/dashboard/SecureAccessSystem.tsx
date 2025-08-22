import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Eye, 
  Lock, 
  Key, 
  FileText, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Settings,
  User,
  Building,
  Activity
} from 'lucide-react';

const SecureAccessSystem = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'finance', name: 'Finance' },
    { id: 'legal', name: 'Legal' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'operations', name: 'Operations' },
    { id: 'executive', name: 'Executive' }
  ];

  const accessLogs = [
    {
      id: 1,
      user: 'Priya Sharma',
      department: 'Finance',
      action: 'Viewed Q4 Budget Report',
      timestamp: '2 hours ago',
      resource: 'Budget Dashboard',
      status: 'success'
    },
    {
      id: 2,
      user: 'Rajesh Kumar',
      department: 'Legal',
      action: 'Downloaded Agency Contract',
      timestamp: '4 hours ago',
      resource: 'Contract Library',
      status: 'success'
    },
    {
      id: 3,
      user: 'Anita Desai',
      department: 'Marketing',
      action: 'Approved Campaign Creative',
      timestamp: '6 hours ago',
      resource: 'Brand Workspace',
      status: 'success'
    },
    {
      id: 4,
      user: 'Unknown User',
      department: 'External',
      action: 'Failed login attempt',
      timestamp: '8 hours ago',
      resource: 'Login Portal',
      status: 'failed'
    }
  ];

  const departmentAccess = [
    {
      department: 'Finance',
      permissions: ['Budget Dashboard', 'Spend Reports', 'ROI Analytics', 'Cost Centers'],
      users: 8,
      lastActivity: '2 hours ago',
      status: 'active'
    },
    {
      department: 'Legal',
      permissions: ['Contract Library', 'Compliance Reports', 'Vendor Agreements', 'Risk Assessments'],
      users: 4,
      lastActivity: '4 hours ago',
      status: 'active'
    },
    {
      department: 'Marketing',
      permissions: ['Brand Workspace', 'Campaign Management', 'Asset Library', 'Performance Metrics'],
      users: 12,
      lastActivity: '1 hour ago',
      status: 'active'
    },
    {
      department: 'Operations',
      permissions: ['Vendor Directory', 'Project Tracking', 'Resource Planning', 'Quality Control'],
      users: 6,
      lastActivity: '3 hours ago',
      status: 'active'
    },
    {
      department: 'Executive',
      permissions: ['Executive Dashboard', 'Strategic Reports', 'All Departments', 'System Settings'],
      users: 3,
      lastActivity: '5 hours ago',
      status: 'active'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDepartmentIcon = (department) => {
    switch (department.toLowerCase()) {
      case 'finance': return <FileText className="w-5 h-5 text-green-600" />;
      case 'legal': return <Shield className="w-5 h-5 text-blue-600" />;
      case 'marketing': return <Users className="w-5 h-5 text-purple-600" />;
      case 'operations': return <Settings className="w-5 h-5 text-orange-600" />;
      case 'executive': return <Building className="w-5 h-5 text-red-600" />;
      default: return <User className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Secure Access System</h1>
        <p className="text-gray-600 mt-2">Finance can see budgets, legal sees contracts, marketing manages projects. Keeps every department in sync with full logs.</p>
      </div>

      {/* Access Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">33</p>
              <p className="text-sm text-green-600 mt-1">+3 this month</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Sessions</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">18</p>
              <p className="text-sm text-gray-500 mt-1">Across 5 departments</p>
            </div>
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Security Score</p>
              <p className="text-2xl font-bold text-green-600 mt-2">98%</p>
              <p className="text-sm text-green-600 mt-1">Excellent</p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed Attempts</p>
              <p className="text-2xl font-bold text-red-600 mt-2">2</p>
              <p className="text-sm text-gray-500 mt-1">Last 24 hours</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Department Access Matrix */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Access Matrix</h3>
        <div className="space-y-4">
          {departmentAccess.map((dept, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getDepartmentIcon(dept.department)}
                  <div>
                    <h4 className="font-medium text-gray-900">{dept.department}</h4>
                    <p className="text-sm text-gray-600">{dept.users} users • Last activity: {dept.lastActivity}</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                  {dept.status.toUpperCase()}
                </span>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Access Permissions:</p>
                <div className="flex flex-wrap gap-2">
                  {dept.permissions.map((permission, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Access Logs</h3>
          <select 
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accessLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-sm font-medium text-gray-900">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getDepartmentIcon(log.department)}
                      <span className="ml-2 text-sm text-gray-900">{log.department}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.resource}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(log.status)}`}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Features</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Lock className="w-5 h-5 text-purple-600" />
              <h4 className="font-medium text-purple-600">Role-Based Access</h4>
            </div>
            <p className="text-sm text-gray-700">Each department sees only what they need. Finance sees budgets, Legal sees contracts.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Eye className="w-5 h-5 text-pink-600" />
              <h4 className="font-medium text-pink-600">Full Activity Logs</h4>
            </div>
            <p className="text-sm text-gray-700">Every action is tracked and logged. Know who did what, when, and where.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Key className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-600">Secure Authentication</h4>
            </div>
            <p className="text-sm text-gray-700">Multi-factor authentication and enterprise-grade security protocols.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureAccessSystem;