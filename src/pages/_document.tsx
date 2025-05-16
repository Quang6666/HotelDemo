import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        {/* Font Google: League Spartan */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700;400&display=swap" rel="stylesheet" />
        {/* FontAwesome: async để tránh lỗi sync script */}
        <script src="https://kit.fontawesome.com/2c36e9b7b1.js" crossOrigin="anonymous" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
