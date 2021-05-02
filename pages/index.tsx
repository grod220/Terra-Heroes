import Head from 'next/head';
import { Header } from '../components/header';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Terra-X-Men</title>
        <meta name="description" content="Coding challenge for Terra Labs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  );
}
