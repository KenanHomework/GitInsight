import { Link } from "@nextui-org/react";
import React from "react";
import classNames from "classnames";

export const RepoInfoView = ({
  label,
  labelIcon,
  value,
  url,
  isLink = false,
  startContent,
  orientation = "vertical",
  showAnchorIcon = true,
}: {
  label?: string;
  url?: string;
  value: string;
  isLink?: boolean;
  showAnchorIcon?: boolean;
  startContent?: React.ReactNode;
  labelIcon?: React.ReactNode;
  orientation?: "vertical" | "horizontal";
}) => {
  if (!value || value.length === 0) return null;
  return (
    <div
      className={classNames({
        "flex flex-col gap-1.5 justify-start": true,
        "!flex-row !items-center": orientation === "horizontal",
      })}
    >
      {label ? (
        <p className={"text-second text-sm"}>{label}</p>
      ) : (
        <div className={"text-second"}>{labelIcon}</div>
      )}

      <Link
        href={isLink ? url : undefined}
        showAnchorIcon={isLink ? showAnchorIcon : false}
        target={"_blank"}
        className={"font-semibold text-sm text-white gap-1 items-center"}
      >
        {startContent && <div>{startContent}</div>}
        {value}
      </Link>
    </div>
  );
};
