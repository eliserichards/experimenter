/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { navigate, RouteComponentProps } from "@reach/router";
import React, { useCallback, useState } from "react";
import AppLayout from "../AppLayout";
import Head from "../Head";
import { useQuery } from "@apollo/client";
import { Alert, Tab, Tabs } from "react-bootstrap";
import {
  useConfig,
  useRefetchOnError,
  useSearchParamsState,
} from "../../hooks";
import { getAllExperiments_experiments } from "../../types/getAllExperiments";
import PageLoading from "../PageLoading";
import { Link } from "@reach/router";
import { CSVLink } from "react-csv";

def download_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = "attachment; filename=reportlog.csv"
    writer = csv.writer(response)
    writer.writerow(
        [
            "Timestamp",
            "Experiment Slug",
            "Experiment Name",
            "Experiment Type",
            "Old Status",
            "New Status",
            "Event",
            "Event Reason",
            "Comment",
            "Projects",
        ]
    )

    for rl in queryset:
        projects = list(rl.projects.values_list("name", flat=True).order_by("name"))
        writer.writerow(
            [
                rl.timestamp,
                rl.experiment_slug,
                rl.experiment_name,
                rl.experiment_type,
                rl.experiment_old_status,
                rl.experiment_new_status,
                rl.event,
                rl.event_reason,
                rl.comment,
                projects,
            ]
        )

    return response

// const PageReporting: React.FunctionComponent<RouteComponentProps> = () => {
//   return (
//     <AppLayout testid="PageReporting">
//       <Head title="Reporting!" />

//       <div className="d-flex justify-content-between">
//         <h1 className="h2">Reporting!</h1>
//         <div>
//           <Link
//             to="new"
//             data-sb-kind="pages/New"
//             className="btn btn-primary btn-small ml-2"
//             id="create-new-button"
//           >
//             Download CSV
//           </Link>
//         </div>
//       </div>
//       <Body />
//     </AppLayout>
//   );
// };

// const { application, num_in_release, num_with_kpi_impact, cdou, other_business_goals } = sortByStatus(
  // filterExperiments(data.experiments, filterValue),
// );

// export const Body = () => {
//   const { data, loading, error, refetch } = useQuery<{
//     experiments: getAllExperiments_experiments[];
//   }>(GET_EXPERIMENTS_QUERY, { fetchPolicy: "network-only" });

  // const filterValue = getFilterValueFromParams(config, searchParams);
  // const onFilterChange = (newFilterValue: FilterValue) =>
  //   updateParamsFromFilterValue(updateSearchParams, newFilterValue);

  // if (!data) {
  //   return <div>No experiments found.</div>;
  // }
  // const { complete } = sortByStatus(data.experiments);
  // const filterOptions: FilterOptions = {
  //   channels: config!.channels!
  // };
  // const filterValue = getFilterValueFromParams(config);

//   return (
//     <>
//       <Tabs >
//         <Tab eventKey="drafts" title={`Application`}>
//           <DirectoryTable experiments={complete} />
//         </Tab>
//       </Tabs>
//     </>
//   );
// };

// export default PageReporting;
