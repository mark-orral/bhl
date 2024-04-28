import { useState, useEffect } from "react";
import cn from "classnames";

// import { useContentContext } from "@/components/common/providers/ContentProvider";
import { setBodyFixed, clearBodyFixed } from "@/lib/utils";

import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";
import Logo from "@/components/molecules/Logo";
import Navigation from "@/components/molecules/Navigation";

import styles from "./header.module.scss";
import { CMS_URL_LOGIN } from "@/lib/utils/constants";

const main = [
  {
    label: "Community Board",
    url: "/community/all",
  },
  {
    label: "Find A Space",
    url: "/spaces/all",
  },
  {
    label: "Directory + Map",
    url: "/directory",
  },
  {
    label: "Skills + Training",
    url: "/skills-and-training",
  },
  {
    label: "About",
    url: "/about",
  },
];

const accounts = [
  {
    label: "Register Your Business",
    url: "/register",
  },
  {
    label: "Login",
    url: CMS_URL_LOGIN,
    external: true,
  },
];

const Header = () => {
  const [isNavActive, setNavActiveState] = useState(false);

  useEffect(() => {
    let fixBody;

    if (isNavActive) {
      fixBody = setTimeout(setBodyFixed, 250);
    }

    return function cleanup() {
      clearBodyFixed();
      clearTimeout(fixBody);
    };
  }, [isNavActive]);

  return (
    <header className={cn(styles.component, isNavActive && styles.active_menu)}>
      <Container>
        <div className={styles.component_layout}>
          <div className={styles.component_logo}>
            <Logo height="25" width="194" />
          </div>

          <nav className={styles.component_navigation_main}>
            <Navigation
              className={styles.component_navigation_main_list}
              links={main}
            />

            <Navigation
              className={styles.component_navigation_account_list}
              links={accounts}
            />
          </nav>

          <Button
            className={cn(styles.component_navigation_button)}
            aria-expanded="false"
            aria-label="Menu"
            aria-controls="mobile-nav"
            onClick={() => setNavActiveState(!isNavActive)}
          >
            <div className={styles.component_navigation_button_icon} />
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
