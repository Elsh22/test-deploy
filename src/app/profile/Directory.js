import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Directory = () => {
  const [directory, setDirectory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [displayedUsers, setDisplayedUsers] = useState([]);

  useEffect(() => {
    const fetchDirectory = async () => {
      try {
        const response = await axios.get('/api/users/directory');
        if (Array.isArray(response.data)) {
          setDirectory(response.data);
          setDisplayedUsers(response.data.slice(0, 10)); 
        } else {
          throw new Error('Data is not an array');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch directory');
      }
    };

    fetchDirectory();
  }, []);

  useEffect(() => {
    const filtered = directory.filter(entry => {
      const nameMatch = entry.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      const majorMatch = entry.major.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = !filterStatus || entry.status === filterStatus;

      return (nameMatch || majorMatch) && statusMatch;
    });

    
    if (searchTerm || filterStatus) {
      setDisplayedUsers(filtered);
    }
  }, [searchTerm, filterStatus, directory]);

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or major"
          className="border px-4 py-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Student">Student</option>
          <option value="Alumni">Alumni</option>
        </select>
      </div>
  
      <div className="overflow-auto rounded-lg shadow select-none">
        <table className="w-full select-none">
          <thead className="bg-gray-50 border-b-2 border-gray-200 select-none">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm select-none">Picture</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm select-none">Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm select-none">Username</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm select-none">Major</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm select-none">Email</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm select-none">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {displayedUsers.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-100 border-b border-gray-200">
                <td className="py-3 px-4">
                  {entry.avatar && (
                    <img src={entry.avatar} alt="Profile" className="w-10 h-10 rounded-full" />
                  )}
                </td>
                <td className="py-3 px-4">{entry.fullName}</td>
                <td className="py-3 px-4">{entry.username}</td>
                <td className="py-3 px-4">{entry.major}</td>
                <td className="py-3 px-4">{entry.email}</td>
                <td className="py-3 px-4">{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Directory;