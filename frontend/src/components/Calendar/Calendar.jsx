'use client';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import events from './Events';

const Calendar = ({ id }) => {
  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8 mt-20" id={id}>
      <div className="w-full max-w-6xl">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: 'today prev,next',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          height="auto"
          events={events}
          eventContent={renderEventContent}
          className="bg-white shadow-md rounded-lg"
        />
      </div>
    </div>
  );
};

function renderEventContent(eventInfo) {
  let title = eventInfo.event.title;
  let bgColor = 'bg-gray-700'; // Default

  if (title.includes('GBM')) {
    bgColor = 'bg-purple-500';
  } else if (title.includes('Mentoring')) {
    bgColor = 'bg-green-500';
  } else if (
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
    bgColor = 'bg-red-500';
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
    bgColor = 'bg-blue-500';
  }

  return (
    <div className={`${bgColor} text-white text-xs sm:text-sm p-1 sm:p-2 rounded-lg`}>
      <b>{eventInfo.timeText}</b>
      <i>{title}</i>
    </div>
  );
}

export default Calendar;
