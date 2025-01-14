"use client";
import { useState, useEffect } from 'react';
import { isFuture, isPast, parseISO } from 'date-fns';
import HeroSection from './sections/HeroSection';
import UpcomingEvents from './sections/UpcomingEvents';
import PastEvents from './sections/PastEvents';
import SuggestionForm from './sections/SuggestionForm';
import FilterSection from './components/FilterSection';
import ShowMoreButton from './components/ShowMoreButton';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [upcomingFilters, setUpcomingFilters] = useState({
    school: 'all',
    search: '',
    showMore: false
  });
  
  const [pastFilters, setPastFilters] = useState({
    school: 'all',
    search: '',
    showMore: false
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
        const response = await fetch(`${STRAPI_URL}/api/events?populate=*`);
        const data = await response.json();
        setEvents(data.data.sort((a, b) => 
          new Date(a.DateStart) - new Date(b.DateStart)
        ));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const upcomingEvents = events.filter(event => isFuture(parseISO(event.DateStart)));
  const pastEvents = events.filter(event => isPast(parseISO(event.DateStart)));

  return (
    <div className="bg-white min-h-screen">
      <HeroSection events={events} />
      
      <UpcomingEvents 
        events={upcomingEvents}
        filters={upcomingFilters}
        setFilters={setUpcomingFilters}
        FilterSection={FilterSection}
        ShowMoreButton={ShowMoreButton}
      />
      
      <PastEvents 
        events={pastEvents}
        filters={pastFilters}
        setFilters={setPastFilters}
        FilterSection={FilterSection}
        ShowMoreButton={ShowMoreButton}
      />
      
      <SuggestionForm />
    </div>
  );
};

export default EventsPage;