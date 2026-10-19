import { request } from '@/api/client';
import type { Reminder } from '@/features/reminders/types';

export const remindersApi = {
    setReminder: (data: Reminder) => request<>
}