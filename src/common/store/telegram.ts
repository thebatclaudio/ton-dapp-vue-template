import { Reactive, reactive } from "vue";
import { TonConnectUI, TonConnectUiOptions, Account } from "@tonconnect/ui";
import { SendTransactionRequest } from "@tonconnect/ui";
import { InitDataParsed, retrieveLaunchParams } from '@telegram-apps/sdk';
import { beginCell, toNano } from "@ton/ton";

interface Telegram {
  walletAccount: Account | null;
  tonConnectUI: TonConnectUI | null;
  initDataRaw: string | undefined | null;
  initData: InitDataParsed | undefined | null;
  init: () => Promise<void>;
  initTelegramData: () => void;
  initWallet: () => Promise<void>;
  initConnectWalletButton: (buttonRootId: string | null) => Promise<void>;
  sendTransaction: (transaction: SendTransactionRequest) => Promise<void>;
}

export const Telegram: Reactive<Telegram> = reactive<Telegram>({
  walletAccount: null,
  tonConnectUI: null,
  initData: null,
  initDataRaw: null,
  async init() {
    this.initTelegramData();
    this.initWallet();
  },
  initTelegramData() {
    const launchParams = retrieveLaunchParams();

    this.initDataRaw = launchParams.initDataRaw;
    this.initData = launchParams.initData;
  },
  async initWallet() {
    await TonConnectUI.getWallets();
  },
  async initConnectWalletButton(buttonRootId: string | null) {
    this.tonConnectUI = new TonConnectUI({
      manifestUrl: import.meta.env.VITE_TELEGRAM_MANIFEST_URL,
      buttonRootId: buttonRootId,
    });

    await this.initWallet();

    this.walletAccount = this.tonConnectUI.account;

    this.tonConnectUI.uiOptions = {
      twaReturnUrl: import.meta.env.VITE_TELEGRAM_BOT_URL,
    } as TonConnectUiOptions;
  },
  async sendTransaction() {
    const body = beginCell()
      .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
      .storeStringTail("Test transaction") // write our text comment
      .endCell();

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        {
          address: import.meta.env.VITE_TON_CONTRACT_ADDRESS,
          amount: toNano(0.05).toString(),
          payload: body.toBoc().toString("base64"),
        },
      ],
    };

    await this.tonConnectUI?.sendTransaction(transaction);
  },
});