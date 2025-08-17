import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, signal } from '@angular/core';
import { Appointment, TimeSlot } from '../../interfaces/calendar';

import { GoogleCalendarService } from '../../services/google-calendar';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css'],
  imports: [DatePipe, FormsModule],
})
export class AppointmentCalendarComponent implements OnInit {
  currentDate = signal(new Date());
  selectedDate = signal<Date | null>(null);
  selectedTimeSlot = signal<TimeSlot | null>(null);
  clientName = signal('');

  weekDays = signal(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  calendarDays = signal<any[]>([]);
  appointments = signal<Appointment[]>([]);

  // Business hours configuration
  businessHours = signal({
    start: 9, // 9 AM
    end: 17, // 5 PM
    interval: 60, // 60 minutes
  });

  availableTimeSlots = signal<TimeSlot[]>([]);

  ngOnInit() {
    this.generateCalendar();
    this.loadSampleAppointments();
  }

  generateCalendar() {
    const year = this.currentDate().getFullYear();
    const month = this.currentDate().getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.calendarDays.set([]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const appointmentCount = this.getAppointmentCount(date);

      this.calendarDays().push({
        date: date,
        currentMonth: date.getMonth() === month,
        isToday: date.getTime() === today.getTime(),
        isSelected:
          this.selectedDate() &&
          date.getTime() === this.selectedDate()?.getTime(),
        hasAppointments: appointmentCount > 0,
        appointmentCount: appointmentCount,
      });
    }
  }

  selectDate(date: Date) {
    this.selectedDate.set(new Date(date));
    this.selectedTimeSlot.set(null);
    this.clientName.set('');
    this.generateTimeSlots();
    this.generateCalendar(); // Refresh to update selected state
  }

  generateTimeSlots() {
    if (!this.selectedDate()) {
      return;
    }

    this.availableTimeSlots.set([]);
    const { start, end, interval } = this.businessHours();

    for (let hour = start; hour < end; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const timeString = this.formatTime(hour, minute);
        const isBooked = this.isTimeSlotBooked(
          this.selectedDate()!,
          timeString
        );
        const isPast = this.isTimeSlotInPast(
          this.selectedDate()!,
          hour,
          minute
        );

        this.availableTimeSlots().push({
          time: timeString,
          available: !isPast,
          booked: isBooked,
        });
      }
    }
  }

  formatTime(hour: number, minute: number): string {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${period}`;
  }

  isTimeSlotBooked(date: Date, time: string): boolean {
    return this.appointments().some(
      (apt) =>
        apt.date.toDateString() === date.toDateString() && apt.time === time
    );
  }

  isTimeSlotInPast(date: Date, hour: number, minute: number): boolean {
    const now = new Date();
    const slotDate = new Date(date);
    slotDate.setHours(hour, minute, 0, 0);
    return slotDate < now;
  }

  selectTimeSlot(slot: TimeSlot) {
    this.selectedTimeSlot.set(slot);
  }

  bookAppointment() {
    if (
      !this.selectedDate() ||
      !this.selectedTimeSlot() ||
      !this.clientName()
    ) {
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      date: new Date(this.selectedDate()!),
      time: this.selectedTimeSlot()!.time,
      clientName: this.clientName(),
    };

    this.appointments().push(newAppointment);
    this.generateTimeSlots(); // Refresh time slots
    this.generateCalendar(); // Refresh calendar

    // Reset form
    this.selectedTimeSlot.set(null);
    this.clientName.set('');
    // añadir a calendario google

    alert(
      `Appointment booked successfully for ${this.clientName()} on ${this.selectedDate()?.toDateString()} at ${
        newAppointment.time
      }`
    );
  }

  cancelBooking() {
    this.selectedTimeSlot.set(null);
    this.clientName.set('');
  }

  cancelAppointment(appointmentId: string) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.appointments.set(
        this.appointments().filter((apt) => apt.id !== appointmentId)
      );
      this.generateTimeSlots(); // Refresh time slots
      this.generateCalendar(); // Refresh calendar
    }
  }

  getAppointmentCount(date: Date): number {
    return this.appointments().filter(
      (apt) => apt.date.toDateString() === date.toDateString()
    ).length;
  }

  get upcomingAppointments(): Appointment[] {
    const now = new Date();
    return this.appointments()
      .filter((apt) => apt.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  previousMonth() {
    this.currentDate.update((date) => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.update((date) => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
    this.generateCalendar();
  }

  private loadSampleAppointments() {
    // Add some sample appointments for demonstration
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    this.appointments.set([
      {
        id: '1',
        date: tomorrow,
        time: '10:00 AM',
        clientName: 'John Smith',
      },
      {
        id: '2',
        date: nextWeek,
        time: '2:30 PM',
        clientName: 'Sarah Johnson',
      },
    ]);
  }
}
