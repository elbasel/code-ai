import { Code } from "@components/Code";
import { Theme } from "@components/Theme";
import { TourSection } from "@components/Tour/Section";
import { AddToDatabase } from "@components/Tour/Sections/AddToDatabase";
import { CheerioCrawler } from "@components/Tour/Sections/CheerioCrawler";
import { SubSection } from "@components/Tour/SubSection";
import React from "react";

type TourProps = {};

const Tour = ({}: TourProps): React.ReactElement => {
  return (
    <Theme>
      <TourSection title="1. Scrape google results">
        <SubSection title="I. Cheerio crawler">
          <p className="tour-paragraph">
            <span className="min-w-max">
              Enter a url and see a list of the links on that website in the
              response below, check:
            </span>
            <Code>components/Tour/Sections/CheerioCrawler.tsx</Code>
          </p>
          <CheerioCrawler />
        </SubSection>
        <SubSection title="II. Store data in supabase database">
          <p className="tour-paragraph">
            <span className="min-w-max">
              Enter a json string below to store it in database, check:
            </span>
            <Code>components/Tour/Sections/AddToDatabase.tsx</Code>
          </p>
          <AddToDatabase />
        </SubSection>
        <SubSection title="III. Scrape google search results">
          <p className="tour-paragraph">
            <span className="min-w-max">
              Enter a query and see a list of the google search results in the
              response below, check:
            </span>
            <Code>components/Tour/Sections/ScrapeGoogle.tsx</Code>
          </p>
        </SubSection>
      </TourSection>
    </Theme>
  );
};

export default Tour;
