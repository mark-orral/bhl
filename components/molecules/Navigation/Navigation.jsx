import PropTypes from "prop-types";

import Link from "@/components/atoms/Link";

const Navigation = ({ links, className, colour }) => {
  return (
    !!links && (
      <ul className={className}>
        {links.map((link, i) => {
          return (
            <li key={i}>
              <Link
                url={link?.url}
                type={link?.type}
                colour={colour}
                external={!!link?.external}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    )
  );
};

export default Navigation;

Navigation.propTypes = {
  links: PropTypes.array,
  className: PropTypes.string,
  color: PropTypes.string,
};
