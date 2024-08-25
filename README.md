# 🚀 TON DApp Vue Template

Welcome to the **TON DApp Vue Template**! This project is a powerful template designed for creating a Telegram Mini App (TMA) with seamless integration of the TON blockchain using Vue.js. It comes fully equipped with Tailwind CSS for styling and includes a GitHub Actions workflow to automate deployment to GitHub Pages.

Demo: [https://thebatclaudio.github.io/ton-dapp-vue-template](https://thebatclaudio.github.io/ton-dapp-vue-template)

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TON](https://img.shields.io/badge/TON-0078FF?style=for-the-badge&logo=ton&logoColor=white)
![Telegram](https://img.shields.io/badge/Telegram_Mini_App-0088cc?style=for-the-badge&logo=telegram&logoColor=white)
![GitHub_Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)

## 🌟 Features

- **Vue.js**: Build reactive and powerful UIs with the Vue.js framework.
- **TON Integration**: Easily connect and interact with the TON blockchain.
- **Telegram Mini App**: Create and deploy your application as a Telegram Mini App.
- **Tailwind CSS**: Utility-first CSS framework for rapidly building custom designs.
- **GitHub Pages Deployment**: Automatically deploy your app with GitHub Actions.

Explore these resources to extend and deepen your integration with TON and Telegram.

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js version 20 or higher installed. 
- **NVM (Node Version Manager) (optional)**: Recommended for managing Node.js versions. If you don't use NVM, ensure you manually switch to Node.js version 20 or higher.

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/thebatclaudio/ton-dapp-vue-template.git
    cd ton-dapp-vue-template
    ```

2. **Set the Node.js version** (if using NVM):
    ```bash
    nvm use
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Set up environment variables**:
    ```bash
    cp .env.example .env
    ```

5. **Edit the `.env` file**:
    - Open the `.env` file and replace the placeholder values with your actual environment variables.

6. **Run the development server**:
    ```bash
    npm run dev
    ```

### 🌍 Deployment

This project includes a GitHub Actions workflow that automates deployment to GitHub Pages. To deploy your project:

1. **Activate GitHub Pages**:
   - Go to your GitHub repository settings.
   - Under the **Pages** section, select the `GitHub Actions` branch as the source for build and deployment and save the settings.

2. **Configure production environment variables**:
   - Edit the `.env.production` file with the necessary environment variables for your production setup.

3. **Push to the `main` branch**:
   - The GitHub Actions workflow triggers on every push to `main` and will deploy the app to GitHub Pages automatically.

## 📚 Documentation & References

This project leverages several powerful libraries and SDKs:

- **Telegram SDK**: [@telegram-apps/sdk](https://github.com/Telegram-Web-Apps/twa-dev-sdk)
- **TON SDK**: [@ton/ton](https://github.com/ton-blockchain/ton)
- **TON Connect UI**: [@tonconnect/ui](https://ton.org/docs/tonconnect/ui/)
- **Telegram Web App SDK**: [@twa-dev/sdk](https://github.com/Telegram-Web-Apps/twa-dev-sdk)

## 🤝 Contributing

Contributions are welcome! Feel free to fork the project, submit a pull request, or open an issue for any changes or improvements.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
