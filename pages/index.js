import BaseLayout from '@/components/layout'
import axios from 'axios';
import Head from 'next/head' 
import Image from 'next/image';
import { useEffect } from 'react'
 

export default function Home() {
  
  return (
    <>
      <Head>
        <title>My app</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout pageName="home">
        <div style={{marginTop: "50px"}}>
          <Image src="/img/comingSoon.jpg" width={400} height={200}/>
        </div>
      </BaseLayout>
    </>
  )
}
