import { Time } from '@internationalized/date';
/**
 * Parses freeform time text typed by a user into a `Time`.
 *
 * Bare digit runs are read as 24h ("1900" -> 19:00, "730" -> 7:30, "7" -> 07:00).
 * An am/pm suffix reinterprets the hour as 12h ("7pm" -> 19:00, "12am" -> 00:00).
 * Returns `null` if the text doesn't resemble a time.
 */
export declare function parseTimeInput(raw: string): Time | null;
export declare function formatTime(t: Time, hourCycle: 12 | 24): string;
