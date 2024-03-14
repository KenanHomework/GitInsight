import { Card } from "@nextui-org/card";
import { Progress } from "@nextui-org/react";

export const ProgressBarChart = ({
  header,
  data,
}: {
  header: string;
  data: { [key: string]: number };
}) => {
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const colors = ["default", "secondary", "success", "warning", "danger"];

  const bgColors = [
    "#03C988",
    "#B6EADA",
    "#C147E9",
    "#D49B54",
    "#1E5128",
    "#FF0000",
    "#2F58CD",
    "#635985",
    "#2D033B",
    "#BED754",
    "#570530",
    "#719FB0",
    "#c77dff",
    "#ca6702",
  ];

  const getRandomColorBg = () =>
    bgColors[Math.floor(Math.random() * bgColors.length)];

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const findPercentage = (value: number) => {
    return Math.floor((value / total) * 100) + "%";
  };

  return (
    <Card
      className={
        "w-[500px] bg-primary  border border-[#252525] rounded-lg p-4 flex flex-col gap-4 justify-start items-start"
      }
    >
      <h1 className={"font-semibold text-lg"}>{header}</h1>
      <div className={"w-full flex flex-col gap-2 items-start justify-start"}>
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className={"w-full flex flex-col items-start gap-1"}>
            <div className={"flex w-full items-center justify-between"}>
              <span className={""}>{key}</span>
              <span>{findPercentage(value)}</span>
            </div>
            <Progress
              aria-label=""
              value={value}
              maxValue={total}
              className="w-full"
              size={"md"}
              //@ts-ignore
              color={getRandomColor()}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
