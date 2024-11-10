import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDUz1vG_VJVVv_Lpvsb_Q9g7-IbtwFV5fs&libraries=places`}
          async
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
