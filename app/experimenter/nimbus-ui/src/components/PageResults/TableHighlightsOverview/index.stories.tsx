/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { withLinks } from "@storybook/addon-links";
import { storiesOf } from "@storybook/react";
import React from "react";
import TableHighlightsOverview from ".";
import { mockExperimentQuery } from "../../../lib/mocks";
import { RouterSlugProvider } from "../../../lib/test-utils";
import { mockAnalysis } from "../../../lib/visualization/mocks";

storiesOf("pages/Results/TableHighlightsOverview", module)
  .addDecorator(withLinks)
  .add("basic, with one primary probe set", () => {
    const { mock, experiment } = mockExperimentQuery("demo-slug");
    return (
      <RouterSlugProvider mocks={[mock]}>
        <TableHighlightsOverview
          {...{ experiment }}
          results={mockAnalysis().overall}
        />
      </RouterSlugProvider>
    );
  })
  .add("with multiple primary probe sets", () => {
    const { mock, experiment } = mockExperimentQuery("demo-slug", {
      primaryProbeSets: [
        {
          __typename: "NimbusProbeSetType",
          slug: "picture_in_picture",
          name: "Picture-in-Picture",
        },
        {
          __typename: "NimbusProbeSetType",
          slug: "feature_b",
          name: "Feature B",
        },
        {
          __typename: "NimbusProbeSetType",
          slug: "feature_c",
          name: "Feature C",
        },
      ],
    });
    return (
      <RouterSlugProvider mocks={[mock]}>
        <TableHighlightsOverview
          {...{ experiment }}
          results={mockAnalysis().overall}
        />
      </RouterSlugProvider>
    );
  });