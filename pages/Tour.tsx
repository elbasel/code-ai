import React from "react";

import { Theme } from "@components/Theme";
import { Code } from "@components/Code";

import { TourSection } from "@components/Tour/Section";
import { TourSubSection } from "@components/Tour/SubSection";

import { AddToDatabase } from "@components/Tour/SubSections/AddToDatabase";
import { CheerioCrawler } from "@components/Tour/SubSections/CheerioCrawler";
import { GoogleScraper } from "@components/Tour/SubSections/GoogleScraper";
import { ConvertToEmbeddings } from "@components/Tour/SubSections/ConvertToEmbeddings";

type TourProps = {};

const Tour = ({}: TourProps): React.ReactElement => {
  return (
    <Theme className="space-y-4">
      <div className="pb-4 my-4 space-y-4 border-b border-b-gray-500">
        <h1 className="text-3xl ">Take the tour</h1>
        <p className="text-sm italic">
          Expand the below panels to see a step by step guide of what the app
          should do!
        </p>
      </div>
      <TourSection title="1. Scrape google results">
        <TourSubSection title="I. Scrape links on a webpage">
          <span className="inline-block my-3 whitespace-break-spaces">
            Enter a url and see a list of the links on that website in the
            response below, check:
          </span>
          <Code>components/Tour/Sections/CheerioCrawler.tsx</Code>
          <CheerioCrawler />
        </TourSubSection>
        <TourSubSection title="II. Store data in supabase database">
          <span className="inline-block my-3 whitespace-break-spaces">
            Enter a string below to store it in database, check:
          </span>
          <Code>components/Tour/Sections/AddToDatabase.tsx</Code>
          <AddToDatabase />
        </TourSubSection>
        <TourSubSection title="III. Scrape google search results">
          <span className="inline-block my-3 whitespace-break-spaces">
            Enter a query and see a list of the google search results in the
            response below, check:
          </span>
          <Code>components/Tour/Sections/ScrapeGoogle.tsx</Code>
          <GoogleScraper />
        </TourSubSection>
      </TourSection>

      <TourSection title="2. Convert google results into embeddings">
        <TourSubSection title="I. Convert a website content into embeddings">
          <span className="whitespace-break-spaces">
            Enter a url to see the vector representation of its content in the
            response below, check:
          </span>
          <Code>components/Tour/Sections/ConvertToEmbeddings.tsx</Code>
          <ConvertToEmbeddings />
        </TourSubSection>

        <TourSubSection title="II. Store the embeddings in the database"></TourSubSection>
      </TourSection>

      <TourSection title="3. Handle User Input">
        <TourSubSection title="I. Convert user input into embeddings"></TourSubSection>
        <TourSubSection title="II. Search the database for relative information"></TourSubSection>
        <TourSubSection title="III. Tokenize information from the database">
          <span className="inline-block my-3 whitespace-break-spaces">
            The GPT family of models process text using tokens, which are common
            sequences of characters found in text. The models understand the
            statistical relationships between these tokens, and excel at
            producing the next token in a sequence of tokens. check:
            https://www.npmjs.com/package/gpt-3-encoder
          </span>
        </TourSubSection>
      </TourSection>

      <TourSection title="4. Answer the user's query">
        <TourSubSection title="I. Setup the context for the AI model">
          <span className="inline-block my-3 whitespace-break-spaces">
            Here is an example prompt: `You are a helpful assistant. When given
            CONTEXT you answer questions using only that information, and you
            always format your output in markdown. You include code snippets if
            relevant. If you are unsure and the answer is not explicitly written
            in the CONTEXT provided, you say &lsquo;Sorry, I don&lsquo;t know
            how to help with that.&lsquo; If the CONTEXT includes source URLs
            include them under a SOURCES heading at the end of your response.
            Always include all of the relevant source urls from the CONTEXT, but
            never list a URL more than once (ignore trailing forward slashes
            when comparing for uniqueness). Never include URLs that are not in
            the CONTEXT sections. Never make up URLs`;
          </span>
        </TourSubSection>
        <TourSubSection title="II. Get the AI's response to the query">
          <span className="inline-block my-3 whitespace-break-spaces">
            At this point all we need to do is attach the context & the
            users&lsquo;query and send it to the open ai api for a response
          </span>
        </TourSubSection>
      </TourSection>
    </Theme>
  );
};

export default Tour;
