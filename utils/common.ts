import { Octokit } from "octokit";
import moment from "moment";

const octokit = new Octokit({});

export function prepareCommitChartData(
  commits: any[],
  repoCreationDate: string
): { labels: string[]; data: number[] } {
  const creationDate = moment(repoCreationDate);
  const currentDate = moment();

  let step = "week";
  const weeksDiff = currentDate.diff(creationDate, "weeks");
  if (weeksDiff > 20) {
    step = "month";
  }

  const labels: string[][] = [];
  // @ts-ignore
  const currentLabelDate = moment(creationDate).startOf(step);
  let labelDate = moment(currentLabelDate);
  while (labelDate.isBefore(currentDate)) {
    // @ts-ignore
    const labelStartDate = moment(labelDate).startOf(step).format("YYYY-MM-DD");
    // @ts-ignore
    const labelEndDate = moment(labelDate).endOf(step).format("YYYY-MM-DD");
    labels.push([labelStartDate, labelEndDate]);
    // @ts-ignore
    labelDate.add(1, step);
  }

  const commitCounts: { [date: string]: number } = {};
  commits.forEach((commit) => {
    const commitDate = moment(commit.commit.committer.date);
    const labelIndex = labels.findIndex((label) =>
      commitDate.isSameOrBefore(moment(label[1], "YYYY-MM-DD"))
    );
    if (labelIndex !== -1) {
      const label = labels[labelIndex];
      const labelKey = `${label[0]} - ${label[1]}`;
      if (labelKey in commitCounts) {
        commitCounts[labelKey]++;
      } else {
        commitCounts[labelKey] = 1;
      }
    }
  });

  const data: number[] = labels.map((label) => {
    const labelKey = `${label[0]} - ${label[1]}`;
    return commitCounts[labelKey] || 0;
  });

  const updatedLabels = labels.map((label) => {
    const startDate = moment(label[0], "YYYY-MM-DD");
    const endDate = moment(label[1], "YYYY-MM-DD");
    if (step === "week") {
      return `${startDate.format("MMM D")} - ${endDate.format("MMM D")}`;
    } else {
      return startDate.format("YYYY MMMM");
    }
  });

  return { labels: updatedLabels, data };
}

export function calculateTimeAgo(givenDate: string): string {
  const givenDateMoment = moment(givenDate);

  return givenDateMoment.fromNow();
}

export async function getPaginatedData(url: string) {
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
  let pagesRemaining = true;
  let data: any[] = [];

  while (pagesRemaining) {
    const response = await octokit.request(`GET ${url}`, {
      per_page: 100,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const parsedData = parseData(response.data);
    data = [...data, ...parsedData];

    const linkHeader = response.headers.link;

    // @ts-ignore
    pagesRemaining = linkHeader && linkHeader.includes(`rel=\"next\"`);

    if (pagesRemaining) {
      // @ts-ignore
      url = linkHeader.match(nextPattern)[0];
    }
  }

  return data;
}

export function parseData(data: any) {
  if (Array.isArray(data)) {
    return data;
  }

  if (!data) {
    return [];
  }

  delete data.incomplete_results;
  delete data.repository_selection;
  delete data.total_count;

  const namespaceKey = Object.keys(data)[0];
  data = data[namespaceKey];

  return data;
}
