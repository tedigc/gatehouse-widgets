import { twMerge } from "tailwind-merge";

export const Spinner = ({ style, className }: any) => {
  return (
    <div
      role="status"
      style={style}
      className={twMerge(
        "gh-h-5 gh-w-5 gh-animate-spin gh-rounded-full gh-border-2 gh-border-b-2",
        className
      )}
    />
  );
};
