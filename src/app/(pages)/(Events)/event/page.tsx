"use client";
import { useState, useEffect } from 'react';
import { isFuture, isPast, parseISO } from 'date-fns';
import HeroSection from './sections/HeroSection';
import UpcomingEvents from './sections/UpcomingEvents';
import PastEvents from './sections/PastEvents';
import SuggestionForm from './sections/SuggestionForm';
import FilterSection from './components/FilterSection';
import ShowMoreButton from './components/ShowMoreButton';
import { EventItem } from './types/event';

interface FilterState {
  school: string;
  search: string;
  showMore: boolean;
}

const ITEMS_PER_PAGE = 6;

const EventsPage = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [upcomingFilters, setUpcomingFilters] = useState<FilterState>({
    school: 'all',
    search: '',
    showMore: false
  });
  
  const [pastFilters, setPastFilters] = useState<FilterState>({
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

        console.log('Raw data from API:', data.data[0]);
        
        const transformedEvents = data.data.map((item: any) => ({
          id: item.id,
          attributes: {
            Title: item.Title?.trim() || '',
            Description: item.Description?.trim() || '',
            DateStart: item.DateStart ? new Date(item.DateStart).toISOString() : '',
            DateEnd: item.DateEnd ? new Date(item.DateEnd).toISOString() : '',
            Location: item.Location?.trim() || '',
            // Trim whitespace from Schools field
            Schools: item.Schools?.trim() || undefined,
            Slug: item.Slug?.trim() || '',
            RsvpLink: item.RsvpLink?.trim(),
            TypeofEvent: item.TypeofEvent?.trim(),
            Image: {
              data: Array.isArray(item.Image) ? item.Image.map((img: any) => ({
                id: img.id,
                attributes: {
                  url: img.url,
                  formats: img.formats
                }
              })) : null
            }
          }
        }));

        const validEvents = transformedEvents.filter((event: EventItem) => {
          try {
            return event.attributes.DateStart && 
                   !isNaN(new Date(event.attributes.DateStart).getTime());
          } catch (error) {
            console.warn('Invalid date for event:', event);
            return false;
          }
        });

        const sortedEvents = validEvents.sort((a: EventItem, b: EventItem) => 
          new Date(a.attributes.DateStart).getTime() - 
          new Date(b.attributes.DateStart).getTime()
        );

        setEvents(sortedEvents);
        setError(null);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter function with pagination
  const filterEvents = (events: EventItem[], filters: FilterState) => {
    return events.filter(event => {
      // Handle school filtering with trimmed strings
      const matchesSchool = 
        filters.school === 'all' || 
        (event.attributes.Schools?.trim().toLowerCase() === filters.school.trim().toLowerCase());
      
      // Handle search filtering with trimmed strings
      const searchTerm = filters.search.trim().toLowerCase();
      const matchesSearch = !searchTerm ||
        event.attributes.Title.toLowerCase().includes(searchTerm) ||
        event.attributes.Description.toLowerCase().includes(searchTerm) ||
        event.attributes.Location.toLowerCase().includes(searchTerm);
      
      return matchesSchool && matchesSearch;
    });
  };

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const upcomingEvents = filterEvents(
    events.filter(event => {
      try {
        const startDate = new Date(event.attributes.DateStart);
        return !isNaN(startDate.getTime()) && isFuture(startDate);
      } catch {
        return false;
      }
    }),
    upcomingFilters
  ).slice(0, upcomingFilters.showMore ? undefined : ITEMS_PER_PAGE);
  
  const pastEvents = filterEvents(
    events.filter(event => {
      try {
        const startDate = new Date(event.attributes.DateStart);
        return !isNaN(startDate.getTime()) && isPast(startDate);
      } catch {
        return false;
      }
    }),
    pastFilters
  ).slice(0, pastFilters.showMore ? undefined : ITEMS_PER_PAGE);

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