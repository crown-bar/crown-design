import { Time } from '@internationalized/date';
/**
 * Parses freeform time text typed by a user into a `Time`.
 *
 * Bare digit runs are read as 24h ("1900" -> 19:00, "730" -> 7:30, "7" -> 07:00).
 * An am/pm suffix reinterprets the hour as 12h ("7pm" -> 19:00, "12am" -> 00:00).
 * Returns `null` if the text doesn't resemble a time.
 */
export function parseTimeInput(raw) {
    const text = raw.trim().toLowerCase();
    if (!text)
        return null;
    const match = text.match(/^(\d{1,2}):?(\d{2})?\s*(am|pm|a|p)?$/);
    if (!match)
        return null;
    const [, hourStr, minuteStr, meridiem] = match;
    let hour = Number(hourStr);
    const minute = minuteStr ? Number(minuteStr) : 0;
    if (minute > 59)
        return null;
    if (meridiem) {
        if (hour < 1 || hour > 12)
            return null;
        const isPM = meridiem.startsWith('p');
        hour = hour % 12;
        if (isPM)
            hour += 12;
    }
    if (hour > 23)
        return null;
    return new Time(hour, minute);
}
export function formatTime(t, hourCycle) {
    const pad = (n) => n.toString().padStart(2, '0');
    if (hourCycle === 24) {
        return `${pad(t.hour)}:${pad(t.minute)}`;
    }
    const period = t.hour < 12 ? 'AM' : 'PM';
    const h12 = t.hour % 12 === 0 ? 12 : t.hour % 12;
    return `${h12}:${pad(t.minute)} ${period}`;
}
