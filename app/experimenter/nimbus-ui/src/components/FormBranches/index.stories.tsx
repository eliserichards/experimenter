/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
  SubjectBranch,
  SubjectBranches,
  MOCK_EXPERIMENT,
  MOCK_ANNOTATED_BRANCH,
  MOCK_FEATURE_CONFIG,
  MOCK_FEATURE_CONFIG_WITH_SCHEMA,
} from "./mocks";

const onRemove = action("onRemove");
const onChange = action("onChange");
const onAddFeatureConfig = action("onAddFeatureConfig");
const onRemoveFeatureConfig = action("onRemoveFeatureConfig");
const onFeatureConfigChange = action("onFeatureConfigChange");
const onSave = action("onSave");
const onNext = action("onNext");

const commonFormBranchProps = {
  onRemove,
  onChange,
  onAddFeatureConfig,
  onRemoveFeatureConfig,
  onFeatureConfigChange,
};

const commonFormBranchesProps = { onSave, onNext };

storiesOf("components/FormBranches/FormBranch", module)
  .add("reference branch", () => (
    <SubjectBranch
      {...commonFormBranchProps}
      branch={{
        ...MOCK_ANNOTATED_BRANCH,
        featureValue: null,
      }}
      isReference={true}
    />
  ))
  .add("treatment branch", () => (
    <SubjectBranch
      {...commonFormBranchProps}
      branch={{
        ...MOCK_ANNOTATED_BRANCH,
        featureValue: null,
      }}
    />
  ))
  .add("equal ratio", () => (
    <SubjectBranch
      {...commonFormBranchProps}
      equalRatio
      branch={{
        ...MOCK_ANNOTATED_BRANCH,
        featureValue: null,
      }}
    />
  ))
  .add("with feature", () => (
    <SubjectBranch
      {...commonFormBranchProps}
      experimentFeatureConfig={MOCK_FEATURE_CONFIG}
      branch={{
        ...MOCK_ANNOTATED_BRANCH,
        featureEnabled: false,
        featureValue: "this is a default value",
      }}
    />
  ))
  .add("with feature value", () => (
    <SubjectBranch
      {...commonFormBranchProps}
      experimentFeatureConfig={MOCK_FEATURE_CONFIG_WITH_SCHEMA}
      branch={{
        ...MOCK_ANNOTATED_BRANCH,
        featureEnabled: true,
        featureValue: "this is a default value",
      }}
    />
  ));

storiesOf("components/FormBranches", module)
  .add("with branches", () => <SubjectBranches {...commonFormBranchesProps} />)
  .add("with equal ratio", () => (
    <SubjectBranches
      {...commonFormBranchesProps}
      experiment={{
        ...MOCK_EXPERIMENT,
        referenceBranch: { ...MOCK_EXPERIMENT.referenceBranch!, ratio: 1 },
        treatmentBranches: MOCK_EXPERIMENT.treatmentBranches!.map((branch) => ({
          ...branch!,
          ratio: 1,
        })),
      }}
    />
  ))
  .add("empty", () => (
    <SubjectBranches
      {...commonFormBranchesProps}
      experiment={{
        ...MOCK_EXPERIMENT,
        referenceBranch: null,
        treatmentBranches: null,
      }}
    />
  ))
  .add("with features", () => (
    <SubjectBranches
      {...commonFormBranchesProps}
      experiment={{
        ...MOCK_EXPERIMENT,
        featureConfig: MOCK_FEATURE_CONFIG,
      }}
    />
  ))
  .add("with feature values", () => (
    <SubjectBranches
      {...commonFormBranchesProps}
      experiment={{
        ...MOCK_EXPERIMENT,
        featureConfig: MOCK_FEATURE_CONFIG_WITH_SCHEMA,
      }}
    />
  ));