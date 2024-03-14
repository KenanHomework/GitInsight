"use client";
import { Card } from "@nextui-org/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import { getPaginatedData, prepareCommitChartData } from "@/utils/common";
import { useAuthData } from "@/utils/auth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const AnalyticsPage = ({ repoName }: { repoName: string }) => {
  const { login } = useAuthData();
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    async function getAllCommits() {
      const res = await fetch(
        `https://api.github.com/repos/${login}/${repoName}`
      );
      const repo = await res.json();
      const commits = await getPaginatedData(
        `/repos/${login}/${repoName}/commits`
      );

      // @ts-ignore
      const commitChartData = prepareCommitChartData(commits, repo.created_at);
      console.log(commitChartData);

      const data = {
        labels: commitChartData.labels,
        datasets: [
          {
            data: commitChartData.data,
            label: "Commits",
            borderColor: "rgb(62,149,205)",
            backgroundColor: "rgb(62,149,205,0.1)",
            fill: true,
          },
        ],
      };

      setChartData(data);
    }
    getAllCommits();
  }, []);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `${repoName} Commits History`,
      },
      legend: {
        display: false,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <>
      <Card
        className={
          "w-full h-[400px] bg-primary flex flex-row items-center justify-around py-5 pl-4 pr-6 border border-[#252525] smooth-animation rounded-lg gap-6"
        }
      >
        {chartData && <Line options={options} data={chartData} />}
      </Card>
    </>
  );
};
