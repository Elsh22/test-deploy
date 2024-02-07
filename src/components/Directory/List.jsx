// List.jsx
import React from 'react';

// Dummy data array as a named export
export const data = [
  { name: 'John Doe', email: 'john@example.com', status: 'Alumni', major: 'Computer Science' },
  { name: 'Jane Smith', email: 'jane@example.com', status: 'Student', major: 'Business' },
  { name: 'Michael Brown', email: 'michael@example.com', status: 'Alumni', major: 'Art History' },
  { name: 'Emma Johnson', email: 'emma@example.com', status: 'Student', major: 'Physics' },
  // ...add more entries as needed
];

// List component as a default export
const List = ({ entries }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full ">
          <thead>
            <tr>
              <th className="text-left theme-text py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th className="text-left theme-text py-3 px-4 uppercase font-semibold text-sm">Email</th>
              <th className="text-left theme-text py-3 px-4 uppercase font-semibold text-sm">Major</th>
              <th className="text-left theme-text py-3 px-4 uppercase font-semibold text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index} className="text-gray-700 ">
                <td className="text-left theme-text py-3 px-4 mb-2">{entry.name}</td>
                <td className="text-left theme-text py-3 px-4 mb-2" >{entry.email}</td>
                <td className="text-left theme-text py-3 px-4 mb-2">{entry.major}</td>
                <td className="text-left flex theme-text py-3 px-4 bg-gray-300 rounded-full mb-2">{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default List;