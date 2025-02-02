"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  ExternalLink,
  GraduationCap,
  Share2
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image'

// Define the Event interface
interface EventImage {
  url: string;
  formats?: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
  };
}

interface Event {
  Title: string;
  Description: string;
  School?: string;
  DateStart: string;
  DateEnd: string;
  Location: string;
  RvspLink?: string;
  Image?: EventImage[];
  Slug: string;
}

interface Params {
  slug: string;
}

const EventPage = () => {
  const params = useParams() as unknown as Params;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
        const response = await fetch(
          `${STRAPI_URL}/api/events?filters[Slug]=${params?.slug}&populate=*`
        );
        const data = await response.json();

        if (data.data && data.data[0]) {
          setEvent(data.data[0]);
        } else {
          setError('Event not found');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    if (params?.slug) {
      fetchEvent();
    }
  }, [params?.slug]);

  const getImageUrl = (event: Event | null): string => {
    try {
      if (!event?.Image?.[0]?.url) {
        return '/api/placeholder/1200/600';
      }
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
      const imageUrl = 
        event.Image[0].formats?.large?.url || 
        event.Image[0].formats?.medium?.url || 
        event.Image[0].formats?.small?.url || 
        event.Image[0].url;
      return `${STRAPI_URL}${imageUrl}`;
    } catch (error) {
      console.error('Error getting image URL:', error);
      return '/api/placeholder/1200/600';
    }
  };

  const formatDate = (dateStr: string): string => {
    try {
      return format(parseISO(dateStr), 'MMMM d, yyyy');
    } catch (error) {
      return 'Date not available';
    }
  };

  const formatTime = (dateStr: string): string => {
    try {
      return format(parseISO(dateStr), 'h:mm a');
    } catch (error) {
      return 'Time not available';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading event details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Link 
          href="/event"
          className="text-blue-600 hover:text-blue-700 inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>
      </div>
    );
  }

  if (!event) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src={getImageUrl(event)}
          alt={event.Title}
          className="w-full h-full object-cover"
          fill
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center text-white px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-4"
            >
              {event.Title}
            </motion.h1>
            {event.School && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                {event.School}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">About This Event</h2>
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown>{event.Description}</ReactMarkdown>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Date and Time */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold mb-4">Date and Time</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  {formatDate(event.DateStart)}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  {formatTime(event.DateStart)} - {formatTime(event.DateEnd)}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold mb-4">Location</h3>
              <div className="flex items-start text-gray-600">
                <MapPin className="w-5 h-5 mr-2 mt-1" />
                <span>{event.Location}</span>
              </div>
            </div>

            {/* RSVP Button */}
            {event.RvspLink && (
            <a
            href={event.RvspLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-center font-medium inline-flex items-center justify-center"
            >
            <span>RSVP Now</span>
            <ExternalLink className="w-4 h-4 ml-2" />
            </a>
            )}

            {/* Share Button */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: event.Title,
                    text: event.Description?.slice(0, 100) + '...',
                    url: window.location.href,
                  });
                }
              }}
              className="flex items-center justify-center w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Event
            </button>

            {/* Back to Events */}
            <Link
              href="/event"
              className="flex items-center justify-center w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;