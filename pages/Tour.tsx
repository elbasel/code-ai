import { Code } from "@components/Code";
import { Theme } from "@components/Theme";
import { TourSection } from "@components/Tour/Section";
import { CheerioCrawler } from "@components/Tour/Sections/CheerioCrawler";
import { SubSection } from "@components/Tour/SubSection";
import React from "react";

type TourProps = {};

const Tour = ({}: TourProps): React.ReactElement => {
  return (
    <Theme>
      <TourSection title="1. Scrape google results">
        <SubSection title="I. Cheerio crawler" defaultOpen={true}>
          <p className="flex flex-wrap items-center gap-1 py-2 text-sm bg-black text-slate-500 hover:text-white">
            <span className="min-w-max">
              Enter a url and see a list of the links on that website in the
              response below, check:
            </span>
            <Code>components/Tour/Sections/CheerioCrawler.tsx</Code>
          </p>
          <CheerioCrawler />
        </SubSection>
        {/* <ScrapeGoogle /> */}
      </TourSection>
    </Theme>
  );
};

export default Tour;
