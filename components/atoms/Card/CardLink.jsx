import cn from "classnames";

import Link from "@/components/atoms/Link";

import styles from "./card.module.scss";

const icon = (colour = "#1a1a1a", size = { height: "20", width: "18" }) => {
  return (
    <svg width={size.width} height={size.height} viewBox="0 0 20 24">
      <path
        d="M0,0V14.663H14.784L7.958,21.894l2.384,2.262L20.8,12.886,10.342,1.616,7.958,3.878l6.826,7.191H3.191V0Z"
        fill={colour}
      />
    </svg>
  );
};

const iconExt = (colour = "#1a1a1a", size = { height: "20", width: "20" }) => {
  return (
    <svg
      width={size.width}
      height={size.height}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M112.667 59.9999V99.4999C112.667 112.667 112.667 112.667 112.667 112.667H7.33337C7.33337 112.667 7.33337 112.667 7.33337 99.4999V7.33325C7.33337 7.33325 7.33337 7.33325 20.5 7.33325H60"
        stroke={colour}
        stroke-width="13.1667"
        stroke-linecap="square"
      />
      <path
        d="M86.3334 7.33325H112.667C112.667 7.33325 112.667 10.2807 112.667 13.9166V33.6666"
        stroke={colour}
        stroke-width="13.1667"
        stroke-linecap="square"
      />
      <path
        d="M33 87L106 14"
        stroke={colour}
        stroke-width="13.1667"
        stroke-linecap="round"
      />
    </svg>
  );
};

const CardLink = ({
  className,
  url,
  colour,
  external = false,
  showIcon = true,
}) => {
  return url ? (
    <Link external className={cn(styles.link, className)} url={url}>
      {external && showIcon ? iconExt(colour) : showIcon ? icon(colour) : null}
    </Link>
  ) : null;
};
export { CardLink };
