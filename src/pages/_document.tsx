import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ursula Parker",
    "url": "https://ursulaparker.dev",
    "sameAs": [
      "https://www.linkedin.com/in/ursula-parker",
      "https://en.wikipedia.org/wiki/Ursula_Parker",
      "https://www.imdb.com/name/nm3425494"
    ],
    "jobTitle": "Project Manager & Software Architect",
    "affiliation": [
      {
        "@type": "CollegeOrUniversity",
        "name": "Rochester Institute of Technology"
      },
      {
        "@type": "Organization",
        "name": "CogBias AI"
      }
    ]
  };
  
  return (
    <Html lang="en">
      <Head>
        <title>Ursula Parker</title>
        <meta
          name="description"
          content="Portfolio of Ursula Parker – Project Manager and Software Architect at RIT."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
