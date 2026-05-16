'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarDays } from 'lucide-react';
import events from './Events';

const Calendar = ({ id }) => {
  return (
    <section id={id} className="dmc-light-section px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 border border-yellow-400/40 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-yellow-600">
              <CalendarDays className="h-4 w-4" />
              Calendar
            </div>
            <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Keep up with what&apos;s next.
            </h2>
          </div>
          <p className="dmc-muted max-w-md text-lg leading-8">
            Meetings, sports, mentoring, workshops, and community events in one place.
          </p>
        </div>

        <div className="dmc-card-solid overflow-hidden border p-3 md:p-6">
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
          />
        </div>
      </div>
    </section>
  );
};

function renderEventContent(eventInfo) {
  const title = eventInfo.event.title;
  let bgColor = 'bg-neutral-700';

  if (title.includes('GBM')) bgColor = 'bg-violet-600';
  else if (title.includes('Mentoring')) bgColor = 'bg-emerald-600';
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
    bgColor = 'bg-rose-600';
  } else if (
    title.includes('Game') ||
    title.includes('Basketball') ||
    title.includes('Soccer') ||
    title.includes('Flag Football') ||
    title.includes('Kickball') ||
    title.includes('Dodgeball')
  ) {
    bgColor = 'bg-yellow-500 text-black';
  } else if (title.includes('Study Session')) {
    bgColor = 'bg-blue-600';
  }

  return (
    <div className={`${bgColor} w-full p-2 text-xs font-bold leading-tight shadow-sm sm:text-sm`}>
      <span className="block">{eventInfo.timeText}</span>
      <span className="block">{title}</span>
    </div>
  );
}

export default Calendar;
