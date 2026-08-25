/* calendar.js — OSTP @echoShift — Placeholder */
'use strict';
const OSTP_Calendar = {
  initDatePicker: function(inputSelector, options = {}) { console.log('[OSTP Calendar] initDatePicker', inputSelector); },
  initTimePicker: function(inputSelector) { console.log('[OSTP Calendar] initTimePicker', inputSelector); }
};
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-date-picker]').forEach(el => { OSTP_Calendar.initDatePicker(el); });
  document.querySelectorAll('[data-time-picker]').forEach(el => { OSTP_Calendar.initTimePicker(el); });
});
window.OSTP_Calendar = OSTP_Calendar;