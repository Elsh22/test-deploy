"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

const EventCalendar = () => {
  const [selectedSchool, setSelectedSchool] = useState("all");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const schools = ["All Schools", "ODU", "VCU", "JMU", "Non-profit"];

  // Color mapping for different schools
  const schoolColors = {
    'ODU': {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      hover: 'hover:bg-blue-200'
    },
    'VCU': {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      hover: 'hover:bg-yellow-200'
    },
    'JMU': {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      hover: 'hover:bg-purple-200'
    },
    'Non-profit': {
      bg: 'bg-green-100',
      text: 'text-green-700',
      hover: 'hover:bg-green-200'
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
        const response = await fetch(`${STRAPI_URL}/api/school-calendars`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        
        const transformedEvents = data.data.map(event => ({
          id: event.id,
          title: event.EventName,
          startTime: new Date(event.StartTime),
          endTime: new Date(event.EndTime),
          location: event.Location,
          school: event.Schools
        }));
        
        setEvents(transformedEvents);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    
  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const goToNextMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    
  const goToPreviousMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));

  const getFilteredEvents = (day) => {
    const eventDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    
    return events.filter((event) => {
      const sameDate =
        event.startTime.getDate() === eventDate.getDate() &&
        event.startTime.getMonth() === eventDate.getMonth() &&
        event.startTime.getFullYear() === eventDate.getFullYear();
      const matchesSchool =
        selectedSchool === "all" || event.school.toLowerCase() === selectedSchool.toLowerCase();
      return sameDate && matchesSchool;
    });
  };

  const getEventStyles = (school) => {
    const colors = schoolColors[school] || {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      hover: 'hover:bg-gray-200'
    };
    return `${colors.bg} ${colors.text} ${colors.hover}`;
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Generate empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({
        type: 'empty',
        key: `empty-${i}`,
        content: <td key={`empty-${i}`} className="p-4 border"></td>
      });
    }

    // Generate cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getFilteredEvents(day);
      days.push({
        type: 'day',
        key: `day-${day}`,
        content: (
          <td
            key={`day-${day}`}
            className="p-3 md:p-5 lg:p-6 border min-h-[100px] lg:min-h-[150px] align-top hover:bg-gray-50 transition"
          >
            <div className="text-sm lg:text-base font-semibold mb-2">{day}</div>
            {dayEvents.map((event) => (
              <div
                key={`event-${event.id}-${day}`}
                className={`rounded p-1 mb-1 text-xs lg:text-sm truncate transition cursor-pointer ${getEventStyles(event.school)}`}
                title={`${event.title}\n${event.startTime.toLocaleTimeString()} - ${event.endTime.toLocaleTimeString()}\n${event.location}\nSchool: ${event.school}`}
              >
                {event.title}
              </div>
            ))}
          </td>
        )
      });
    }
    return days;
  };

  const renderCalendarGrid = () => {
    const days = generateCalendarDays();
    const rows = [];
    let cells = [];

    days.forEach((day, index) => {
      cells.push(day.content);
      
      if ((index + 1) % 7 === 0 || index === days.length - 1) {
        // Fill remaining cells in the last row if needed
        while (cells.length < 7) {
          const emptyKey = `empty-end-${cells.length}`;
          cells.push(<td key={emptyKey} className="p-4 border"></td>);
        }
        
        // Create row with unique key based on the first day in the row
        const rowKey = `row-${Math.floor(index / 7)}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
        rows.push(<tr key={rowKey}>{cells}</tr>);
        cells = [];
      }
    });

    return rows;
  };

  if (loading) {
    return <div className="text-center py-8">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-[90%] lg:max-w-[1200px] mx-auto p-6 md:p-8 lg:p-10 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Color legend */}
            <div className="hidden md:flex items-center gap-3 text-sm">
              {Object.entries(schoolColors).map(([school, colors]) => (
                <div key={school} className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded ${colors.bg}`}></div>
                  <span>{school}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="border rounded p-2 focus:ring"
              >
                {schools.map((school) => (
                  <option key={school} value={school === "All Schools" ? "all" : school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <th
                  key={day}
                  className="p-3 lg:p-4 text-center border bg-gray-100 text-gray-600 font-medium"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderCalendarGrid()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default EventCalendar;