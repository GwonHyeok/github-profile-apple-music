import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

interface InjectOptionData {
  adSenseScript: string;
}

const injectOptionData: InjectOptionData = { adSenseScript: '' };

const generateAdsenseScript = (clientId: string) =>
  `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}" crossorigin="anonymous"></script>`;

// Adsense Script
if (process.env.VITE_ADSENSE_ENABLED === 'true' && process.env.VITE_ADSENSE_CLIENT_ID) {
  injectOptionData.adSenseScript = generateAdsenseScript(process.env.VITE_ADSENSE_CLIENT_ID);
}

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: injectOptionData,
      },
    }),
  ],
});
