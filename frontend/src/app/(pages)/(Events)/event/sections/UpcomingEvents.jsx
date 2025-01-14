"use client";
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { formatDate, formatTime } from '../utils/dateFormatters';
import { truncateDescription } from '../utils/eventFilters';
import { getImageUrl } from '../utils/imageHelpers';

const cardReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  }
};

const UpcomingEvents = ({ events, filters, setFilters, FilterSection, ShowMoreButton }) => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Upcoming Events</h2>
        
        <FilterSection 
          filters={filters}
          setFilters={setFilters}
          title="Upcoming Events"
        />

        {events.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No upcoming events match your filters.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                variants={cardReveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <img
                      src={getImageUrl(event)}
                      alt={event.Title}
                      className="w-full h-full object-cover"
                    />
                    {event.Schools && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        {event.Schools}
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold mb-3">{event.Title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(event.DateStart)}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {formatTime(event.DateStart)} - {formatTime(event.DateEnd)}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.Location}
                      </div>
                    </div>
                    <div className="prose prose-sm mb-4">
                      <ReactMarkdown>
                        {truncateDescription(event.Description)}
                      </ReactMarkdown>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Link 
                        href={`/event/${event.Slug}`}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 inline-flex items-center"
                      >
                        Learn More
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Link>
                      {event.RsvpLink && (
                        <a 
                          href={event.RsvpLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 inline-flex items-center"
                        >
                          RSVP Now
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <ShowMoreButton
              filters={filters}
              setFilters={setFilters}
              totalCount={events.length}
              shownCount={events.length}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;