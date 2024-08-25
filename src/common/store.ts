import { Reactive, reactive } from "vue";
import { API } from "./store/api";
import { User } from "../models/User";
import { Telegram } from "./store/telegram";

interface Store {
  user: User | null;
  currentAmount: number;
  maxDailyTaps: number;
  timeoutId: number | null;
  api: Reactive<typeof API>;
  telegram: Reactive<typeof Telegram>;
  init: () => Promise<void>;
  incrementAmount: () => void;
}

export const store: Reactive<Store> = reactive<Store>({
  user: null,
  currentAmount: 0,
  maxDailyTaps: 0,
  timeoutId: null,
  api: API,
  telegram: Telegram,
  async init() {
    this.telegram.init();

    const initResponse = await this.api.init();
    this.maxDailyTaps = initResponse?.daily_taps_limit ?? 1000;

    const initDataRaw = this.telegram.initDataRaw;

    if (initDataRaw) {
      const response = await this.api.authorize(initDataRaw);

      if (response) {
        const user = response.user;

        if (user !== undefined) {
          this.user = user;
          this.currentAmount = user.coins;
        }
      }
    }
  },
  incrementAmount() {
    if (this.user !== null) {
      if(this.user.daily_taps < store.maxDailyTaps) {
        this.currentAmount++;
        this.user.daily_taps++;
  
        if (this.timeoutId) {
          window.clearTimeout(this.timeoutId);
        }
  
        this.timeoutId = window.setTimeout(() => {
          if (this.user !== null) {
            let newTaps = this.currentAmount - this.user.coins;
            this.api.sendTaps(newTaps);
            this.user.coins += newTaps;
          }
        }, 1000);
      }
    }
  }
});
