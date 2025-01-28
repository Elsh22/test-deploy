"use client";
import React, { useState, useEffect } from 'react';
import { format, parseISO, isFuture, differenceInDays } from 'date-fns';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
        const response = await fetch(`${STRAPI_URL}/api/events`);
        const data = await response.json();
        
        // Get current date for comparison
        const today = new Date();
        
        // Filter and sort upcoming events
        const upcomingEvents = data.data
          .filter(event => isFuture(parseISO(event.DateStart)))
          .map(event => ({
            ...event,
            daysUntil: differenceInDays(parseISO(event.DateStart), today),
            // Clean the text content
            Title: event.Title?.replace(/<[^>]*>/g, ''),
            Description: event.Description?.replace(/<[^>]*>/g, '')
          }))
          .sort((a, b) => a.daysUntil - b.daysUntil)
          .slice(0, 3); // Take only the 3 closest upcoming events
        
        setEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="py-12 px-4 text-center">Loading events...</div>;
  }

  const formatDate = (dateStr) => {
    try {
      return format(parseISO(dateStr), 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date not available';
    }
  };

  // Function to truncate text while respecting word boundaries
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    
    const truncated = text.substr(0, maxLength);
    return truncated.substr(0, truncated.lastIndexOf(' ')) + '...';
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <Link 
            href="/event" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center group"
          >
            View All Events 
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div 
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden group relative transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >          
              <div className="p-6 lg:p-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative">
                  <div className="flex items-center space-x-2 text-blue-600 animate-fade-in" 
                       style={{ animationDelay: `${(index * 150) + 100}ms` }}>
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">
                      {formatDate(event.DateStart)}
                      {event.daysUntil === 0 && " (Today)"}
                      {event.daysUntil === 1 && " (Tomorrow)"}
                      {event.daysUntil > 1 && ` (in ${event.daysUntil} days)`}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-semibold group-hover:text-blue-600 transition-colors duration-300 animate-fade-in leading-tight"
                      style={{ animationDelay: `${(index * 150) + 200}ms` }}>
                    {truncateText(event.Title, 70)}
                  </h3>

                  <div className="flex gap-2 mt-2 animate-fade-in" 
                       style={{ animationDelay: `${(index * 150) + 300}ms` }}>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {event.TypeofEvent}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {event.Location}
                    </span>
                  </div>

                  <p className="mt-3 text-gray-600 line-clamp-2">
                    {truncateText(event.Description, 150)}
                  </p>

                  <a 
                    href={`/event/${event.Slug}`}
                    className="block w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-700 text-center"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;