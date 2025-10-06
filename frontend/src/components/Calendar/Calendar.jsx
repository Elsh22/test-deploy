'use client';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import events from './Events';

const Calendar = ({ id }) => {
  return (
    <section
      id={id}
      className="bg-black border-t-4 border-b-4 border-yellow-400 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              start: 'today prev,next',
              center: 'title',
              end: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            height="auto"
            events={events}
            eventContent={renderEventContent}
            className="bg-black text-white rounded-xl shadow-2xl border-2 border-yellow-400"
            dayHeaderClassNames={() =>
              'bg-black text-yellow-400 font-bold border-b border-gray-700'
            }
            dayCellClassNames={() => 'border border-gray-700'}
          />
        </div>
      </div>
    </section>
  );
};

function renderEventContent(eventInfo) {
  let title = eventInfo.event.title;
  let bgColor = 'bg-gray-700'; // Default color

  if (title.includes('GBM')) bgColor = 'bg-purple-600';
  else if (title.includes('Mentoring')) bgColor = 'bg-green-600';
  else if (
    title.includes('Workshop') ||
    title.includes('Internship') ||
    title.includes('Reception') ||
    title.includes('Mixer') ||
    title.includes('LinkedIn') ||
    title.includes('Collaboration') ||
    title.includes('Professional Development') ||
    title.includes('Not On Your Resume') ||
    title.includes('Orientation') ||
    title.includes('Eboard')
  ) {
    bgColor = 'bg-red-600';
  } else if (
    title.includes('Game') ||
    title.includes('Basketball') ||
    title.includes('Soccer') ||
    title.includes('Flag Football') ||
    title.includes('Kickball') ||
    title.includes('Dodgeball')
  ) {
    bgColor = 'bg-yellow-500';
  } else if (title.includes('Study Session')) {
    bgColor = 'bg-blue-600';
  }

  return (
    <div
      className={`${bgColor} text-white text-xs sm:text-sm p-2 rounded-lg shadow-md flex flex-col justify-center items-start space-y-1`}
    >
      <span className="font-bold">{eventInfo.timeText}</span>
      <span className="italic">{title}</span>
    </div>
  );
}

export default Calendar;
