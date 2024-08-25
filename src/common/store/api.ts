import { Reactive, reactive } from "vue";
import { UserResponse } from "../../responses/UserResponse";
import { InitResponse } from "../../responses/InitResponse";

import { store } from "../store";

interface API {
  apiToken: string | null;
  init: () => Promise<InitResponse | undefined>
  authorize: (initDataRaw: string) => Promise<UserResponse | undefined>;
  sendTaps: (taps: number) => Promise<void>;
}

export const API: Reactive<API> = reactive<API>({
  apiToken: null,
  async init(): Promise<InitResponse | undefined> {
    // Implement your API init
    //
    // try {
    //   let response = await fetch(
    //     import.meta.env.VITE_API_BASE_URL + "/init"
    //   );

    //   return response.json();
    // } catch(error) {
    //   console.error(error)
    // }

    return {
      daily_taps_limit: 1000
    }
  },
  async authorize(initDataRaw: string): Promise<UserResponse | undefined> {
    // Implement your authorize API
    //
    // try {
    //   let response = await fetch(
    //     import.meta.env.VITE_API_BASE_URL + "/telegram/authorize",
    //     {
    //       method: "POST",
    //       headers: {
    //         Authorization: `tma ${initDataRaw}`,
    //       },
    //     }
    //   );

    //   if (response.status === 401 || response.status === 404) {
    //     alert("Open me on Telegram!");
    //   }

    //   if (response.status === 403) {
    //     response = await fetch(
    //       import.meta.env.VITE_API_BASE_URL + "/telegram/register",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `tma ${initDataRaw}`,
    //         },
    //         body: JSON.stringify({
    //           initData: initDataRaw,
    //         }),
    //       }
    //     );
        
    //     let json = await response.json();

    //     this.apiToken = json.token;

    //     return json;
    //   }

    //   let json = await response.json();

    //   this.apiToken = json.token;

    //   return json;
    // } catch (error) {
    //   console.error(error);
    // }

    return {
      user : {
        id: 1, // @todo: change
        telegram_id: store.telegram.initData?.user?.id ?? 0, 
        username: store.telegram.initData?.user?.username ?? '', 
        first_name: store.telegram.initData?.user?.firstName ?? '', 
        last_name: store.telegram.initData?.user?.lastName ?? '', 
        coins: parseInt(localStorage.getItem('taps') ?? '0'), // @todo: implement coin 
        language_code: store.telegram.initData?.user?.languageCode ?? 'en', 
        is_premium: store.telegram.initData?.user?.isPremium ? 1 : 0, 
        allows_write_to_pm: store.telegram.initData?.user?.id ?? 0, 
        daily_taps: parseInt(localStorage.getItem('daily_taps') ?? '0'), // @todo: implement daily taps 
      },
      token: initDataRaw
    }
  },
  async sendTaps(taps: number): Promise<void> {
    // if (this.apiToken) {
    //   const response = await fetch(
    //     import.meta.env.VITE_API_BASE_URL + "/taps",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${this.apiToken}`,
    //       },
    //       body: JSON.stringify({
    //         taps: taps,
    //       }),
    //     }
    //   );

    //   return response;
    // }
    localStorage.setItem('taps', (parseInt(localStorage.getItem('taps') ?? '0') + taps).toString());
    localStorage.setItem('daily_taps', (parseInt(localStorage.getItem('daily_taps') ?? '0') + taps).toString());
  },
});
