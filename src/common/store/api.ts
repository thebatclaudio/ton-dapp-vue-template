import { Reactive, reactive } from "vue";
import { UserResponse } from "../../responses/UserResponse";
import { InitResponse } from "../../responses/InitResponse";

interface API {
  apiToken: string | null;
  init: () => Promise<InitResponse | undefined>
  authorize: (initDataRaw: string) => Promise<UserResponse | undefined>;
  sendTaps: (taps: number) => Promise<Response | undefined>;
}

export const API: Reactive<API> = reactive<API>({
  apiToken: null,
  async init(): Promise<InitResponse | undefined> {
    try {
      let response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/init"
      );

      return response.json();
    } catch(error) {
      console.error(error)
    }

    return {
      daily_taps_limit: 1000
    }
  },
  async authorize(initDataRaw: string): Promise<UserResponse | undefined> {
    try {
      let response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/telegram/authorize",
        {
          method: "POST",
          headers: {
            Authorization: `tma ${initDataRaw}`,
          },
        }
      );

      if (response.status === 401 || response.status === 404) {
        alert("Open me on Telegram!");
      }

      if (response.status === 403) {
        response = await fetch(
          import.meta.env.VITE_API_BASE_URL + "/telegram/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `tma ${initDataRaw}`,
            },
            body: JSON.stringify({
              initData: initDataRaw,
            }),
          }
        );
        
        let json = await response.json();

        this.apiToken = json.token;

        return json;
      }

      let json = await response.json();

      this.apiToken = json.token;

      return json;
    } catch (error) {
      console.error(error);
    }
  },
  async sendTaps(taps: number): Promise<Response | undefined> {
    if (this.apiToken) {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/taps",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiToken}`,
          },
          body: JSON.stringify({
            taps: taps,
          }),
        }
      );

      return response;
    }
  },
});
