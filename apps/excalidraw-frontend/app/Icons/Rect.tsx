import { SVGProps } from "react";

export function Rect(props: SVGProps<SVGElement>) {
  return (
    //@ts-ignore
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="3em"
      height="3em"
      {...props}
    >
      <rect
        width="20"
        height="12"
        x="2"
        y="6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        rx="2"
      ></rect>
    </svg>
  )
}
