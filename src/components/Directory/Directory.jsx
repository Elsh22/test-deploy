'use client';
import React, { useState } from 'react';
import List, { data } from './List'; // Ensure this import matches your actual file structure

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredEntries = data.filter((entry) => {
    const term = searchTerm.toLowerCase();
    return (
      (entry.name.toLowerCase().includes(term) || 
       entry.email.toLowerCase().includes(term) ||
       entry.major.toLowerCase().includes(term)) &&
      (filter === 'All' || entry.status === filter)
    );
  });
  

  // Calculate the items to show on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEntries.slice(indexOfFirstItem, indexOfLastItem);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-grow p-8">
        <div className=" shadow rounded-lg p-6">
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <input
              className="appearance-none block w-full md:flex-grow bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 md:mb-0 md:mr-3"
              type="text"
              placeholder="Search by name, email, or major..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="block appearance-none w-full md:w-auto  border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Student">Student</option>
              <option value="Alumni">Alumni</option>
            </select>
          </div>
          <List entries={currentItems} />
          <div className="mt-4 flex justify-center">
            {Array.from({ length: Math.ceil(filteredEntries.length / itemsPerPage) }, (_, index) => index + 1).map(number => (
              <button
                className={`px-4 py-2 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white'}`}
                key={number}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;

