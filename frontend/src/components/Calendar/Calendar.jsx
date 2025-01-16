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
  let bgColor = 'bg-blue-500'; 
  if (eventInfo.event.title.includes('General Body Meeting')) {
    bgColor = 'bg-red-500';
  } else if (eventInfo.event.title.includes('Committee')) {
    bgColor = 'bg-green-500';
  } else if (eventInfo.event.extendedProps.backgroundColor) {
    bgColor = `bg-[${eventInfo.event.extendedProps.backgroundColor}]`; 
  }else if (eventInfo.event.title.includes('Mentoring')) {
    bgColor = 'bg-orange-500';
  }else if (eventInfo.event.title.includes('CGI')) {
    bgColor = 'bg-red-500';
  }else if (eventInfo.event.title.includes('Shadow Day')) {
    bgColor = 'bg-red-500';
  }else if (eventInfo.event.title.includes('Not On Your Resume')) {
    bgColor = 'bg-green-500';
  } 


  return (
    <div className={`${bgColor} text-white text-xs sm:text-sm p-1 sm:p-2 rounded-lg`}>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
}

export default Calendar;
