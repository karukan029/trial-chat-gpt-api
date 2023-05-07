import Head from "next/head"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { IndexPage } from "@/components/pages/IndexPage"

export default function Index() {
  return (
    <Layout>
      <Head>
        <title>Next.js で作る初めての OpenAI アプリ</title>
        <meta name="description" content="AI がどんな質問にも答えます" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IndexPage />
    </Layout>
  )
}
