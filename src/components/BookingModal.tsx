import React, { useState, useMemo } from 'react';
import { X, Calendar as CalendarIcon, Clock, Check, Download, Video } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSlot?: string;
}

const MEETING_TYPES = [
  { id: 'coffee', title: 'Virtual Coffee & Chat', duration: '20 mins', desc: 'Casual chat about coding, projects, or AAiT life' },
  { id: 'collab', title: 'Project Collaboration', duration: '30 mins', desc: 'Discuss a hackathon, side project, or building together' },
  { id: 'opportunity', title: 'Work / Internship', duration: '30 mins', desc: 'Discuss an internship role or freelance work' },
  { id: 'study', title: 'Study & Peer Review', duration: '30 mins', desc: 'Talk about algorithms, code review, or tech topics' },
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedSlot,
}) => {
  const [meetingType, setMeetingType] = useState('coffee');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState(preselectedSlot ? `Preferred window: ${preselectedSlot}` : '');
  const [confirmed, setConfirmed] = useState(false);

  // Generate the next 5 business days
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    let current = new Date(today);
    while (dates.length < 5) {
      current.setDate(current.getDate() + 1);
      const day = current.getDay();
      if (day !== 0 && day !== 6) { // Exclude Sat/Sun
        dates.push(new Date(current));
      }
    }
    return dates;
  }, []);

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const timeSlots = ['10:00 AM EAT', '11:30 AM EAT', '02:00 PM EAT', '03:30 PM EAT', '05:00 PM EAT'];
  const [selectedTime, setSelectedTime] = useState(timeSlots[2]);

  if (!isOpen) return null;

  const formatDateDisplay = (d: Date) => {
    return d.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const generateICSFile = () => {
    const d = availableDates[selectedDateIndex];
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    let hourEAT = parseInt(selectedTime.split(':')[0], 10);
    const isPM = selectedTime.includes('PM');
    if (isPM && hourEAT < 12) hourEAT += 12;
    if (!isPM && hourEAT === 12) hourEAT = 0;
    // EAT is UTC+3, so UTC hour = (hourEAT - 3)
    const hourUTC = (hourEAT - 3 + 24) % 24;
    const startHour = String(hourUTC).padStart(2, '0');
    const endHour = String((hourUTC + 1) % 24).padStart(2, '0');

    const dtStart = `${year}${month}${day}T${startHour}0000Z`;
    const dtEnd = `${year}${month}${day}T${endHour}0000Z`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Eyob Fikru Portfolio//EN',
      'BEGIN:VEVENT',
      `UID:meeting-${Date.now()}@eyobfikru.com`,
      `DTSTAMP:${dtStart}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:Meeting with Eyob Fikre (${meetingType})`,
      `DESCRIPTION:Topic: ${notes || 'Introductory conversation'}. Video link will be dispatched via email.`,
      `ORGANIZER;CN=Eyob Fikre:mailto:${PERSONAL_INFO.email}`,
      `ATTENDEE;CN=${name}:mailto:${email}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Meeting_Eyob_Fikre_${year}${month}${day}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    // Trigger instant ICS calendar file download
    generateICSFile();
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-900 dark:text-zinc-100"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="absolute top-5 right-5 p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-display tracking-tight mb-2">
              Conversation Confirmed!
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto mb-6">
              A calendar invite (.ics) has been downloaded for your calendar for{' '}
              <strong className="text-zinc-900 dark:text-zinc-100">
                {formatDateDisplay(availableDates[selectedDateIndex])} at {selectedTime}
              </strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={generateICSFile}
                className="px-4 py-2 text-xs font-medium border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Re-download .ics file</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="pr-8 mb-6">
              <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                Say Hello
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight font-display">
                Pick a Time to Chat
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Pick a slot that suits your schedule. I am based in Addis Ababa (EAT / UTC+3).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Meeting Type Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 font-mono">
                  1. Select Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {MEETING_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setMeetingType(t.id)}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        meetingType === t.id
                          ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 text-zinc-900 dark:text-zinc-100'
                          : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>{t.title}</span>
                        <span className="text-[10px] text-zinc-400 font-mono">{t.duration}</span>
                      </div>
                      <div className="text-[11px] text-zinc-500 mt-0.5">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 font-mono">
                  2. Select Available Date
                </label>
                <div className="grid grid-cols-5 gap-1.5 mb-3">
                  {availableDates.map((d, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedDateIndex(idx)}
                      className={`py-2 px-1 text-center rounded-lg border text-xs transition-colors ${
                        selectedDateIndex === idx
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium'
                          : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="text-[10px] text-zinc-400">
                        {d.toLocaleDateString('en-GB', { weekday: 'narrow' })}
                      </div>
                      <div className="font-semibold text-xs mt-0.5">
                        {d.getDate()}
                      </div>
                    </button>
                  ))}
                </div>

                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 font-mono">
                  3. Select Slot (Addis Ababa Time / EAT / UTC+3)
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                        selectedTime === slot
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium'
                          : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Agenda or Context
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe what you'd like to discuss..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2.5 text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Video className="w-4 h-4" />
                <span>Confirm & Download Calendar Invite (.ics)</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
