import Head from "next/head";

export default function SiteHead(props: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="generator" content="NextJs" />

        {/* social tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:image" content={props.image} />
        <meta property="og:description" content={props.description} />
        <meta property="og:site_name" content="Instructional" />
      </Head>
    </>
  );
}
