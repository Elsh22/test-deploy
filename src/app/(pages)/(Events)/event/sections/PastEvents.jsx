"use client";
import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { formatDate } from '../utils/dateFormatters';
import { truncateDescription } from '../utils/eventFilters';
import { getImageUrl } from '../utils/imageHelpers';
import Image from 'next/image'

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

const PastEvents = ({ events, filters, setFilters, FilterSection, ShowMoreButton }) => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Past Events</h2>
        
        <FilterSection 
          filters={filters}
          setFilters={setFilters}
          title="Past Events"
        />

        {events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">No past events match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                variants={cardReveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={getImageUrl(event)}
                    alt={`${event.attributes.Title} - Past event showcase`}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                  {event.attributes.Schools && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {event.attributes.Schools}
                    </div>
                  )}
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
                    whileHover={{ opacity: 1 }}
                  >
                    <Link 
                      href={`/event/${event.attributes.Slug}`}
                      className="text-white flex items-center"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.attributes.Title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(event.attributes.DateStart)}
                  </div>
                  {event.attributes.TypeofEvent && (
                    <p className="text-gray-600 mb-4">{event.attributes.TypeofEvent}</p>
                  )}
                  <div className="prose prose-sm text-gray-600 mb-4">
                    <ReactMarkdown>
                      {truncateDescription(event.attributes.Description)}
                    </ReactMarkdown>
                  </div>
                  <Link 
                    href={`/event/${event.attributes.Slug}`}
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center transition-colors duration-200"
                  >
                    Read More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-8">
          <ShowMoreButton
            filters={filters}
            setFilters={setFilters}
            totalCount={events.length}
            shownCount={events.length}
          />
        </div>
      </div>
    </section>
  );
};

export default PastEvents;