export interface ArabicCalendarProps {
  onDateChange?: (date: Date) => void;
  initialDate?: Date;
  locale?: "ar" | "en";
  calendarType?: "gregorian" | "hijri";
}
