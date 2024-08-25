export interface User {
  id: number;
  telegram_id: number;
  username: string;
  first_name: string;
  last_name: string;
  coins: number;
  language_code: string;
  is_premium: number;
  allows_write_to_pm: number;
  daily_taps: number;
}