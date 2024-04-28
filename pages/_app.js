import React, { useState, useEffect } from "react";

import Script from "next/script";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import {
  CookieConsentBanner,
  triggerCookieConsentBanner,
} from "@porscheofficial/cookie-consent-banner-react";

import ContentProvider from "@/components/common/providers/ContentProvider";
import Link from "@/components/atoms/Link";
import * as google from "@/lib/services/google";

import { autoscape } from "@/lib/fonts/autoscape";
import {
  neueMontrealMedium,
  neueMontrealBook,
} from "@/lib/fonts/neue-montreal";

import "@/styles/app.scss";

const WebApp = ({ Component, pageProps }) => {
  const { company, footerCategories } = pageProps;
  const [acceptedCategories, setAcceptedCategories] = useState([]);
  const router = useRouter();

  const [content] = useState({
    company,
    footerCategories,
  });

  const defaultSeoData = {
    title: undefined,
    titleTemplate: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    defaultTitle: process.env.NEXT_PUBLIC_SITE_NAME,
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window !== "undefined") {
        google.analytics.pageview(url);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const initConsent = ({ acceptedCategories }) => {
    // -------------------------------------------------------------------------
    // Error Tracking Service
    // Analytics
    // -------------------------------------------------------------------------
    if (acceptedCategories.includes("analytics")) {
      setAcceptedCategories(acceptedCategories);
      // triggerCookieConsentBanner({ showDetails: true });
    }

    console.log("COOKIE PERMISSIONS :: ", acceptedCategories);
  };

  return (
    <>
      <style
        jsx
        global
      >{`
        :root {
          --autoscape: ${autoscape.style.fontFamily};
          --neue-montreal-medium: ${neueMontrealMedium.style.fontFamily};
          --neue-montreal-book: ${neueMontrealBook.style.fontFamily};
        }
        html {
          font-family: var(--neue-montreal-medium), sans-serif;
        }
      `}</style>

      {(Boolean(acceptedCategories.includes("analytics")) ||
        Boolean(acceptedCategories.includes("marketing"))) &&
        process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
              strategy='afterInteractive'
            />
            <Script
              id='google-analytics'
              strategy='afterInteractive'
            >
              {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window?.dataLayer && window.dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                      anonymize_ip: true,
                      page_path: window.location.pathname,
                  });
              `}
            </Script>
          </>
        )}

      <ContentProvider value={content}>
        {!!defaultSeoData && <DefaultSeo {...defaultSeoData} />}
        {/*!!preview && (
          // TODO -- abstract this to a component.
          <p>
            This page is a preview.{" "}
            <Link href="/api/exit-preview">
              <a>Exit preview mode</a>
            </Link>
          </p>
        )} */}
        <Component {...pageProps} />

        <CookieConsentBanner
          headline='COOKIES'
          handlePreferencesUpdated={initConsent}
          handlePreferencesRestored={initConsent}
          btnLabelAcceptAndContinue='AGREE AND CONTINUE'
          btnLabelSelectAllAndContinue='SELECT ALL AND CONTINUE'
          btnLabelOnlyEssentialAndContinue='USE REQUIRED COOKIES ONLY'
          btnLabelPersistSelectionAndContinue='SAVE SELECTION AND CONTINUE'
          contentSettingsDescription='You can decide which cookies are used by selecting the respective options below. Please note that your selection may impair in the functionality of the service.'
          availableCategories={[
            {
              description:
                "Enable you to navigate and use the basic functions and to store preferences.",
              key: "technically_required",
              label: "Technically necessary cookies",
              isMandatory: true,
            },
            {
              description:
                "Enable us to determine how visitors interact with our service in order to improve the user experience.",
              key: "analytics",
              label: "Analysis cookies",
            },
            {
              description:
                "Enable us to offer and evaluate relevant content and interest-based advertising.",
              key: "marketing",
              label: "Marketing cookies",
            },
          ]}
        >
          We use cookies and similar technologies to provide certain features,
          enhance the user experience and deliver content that is relevant to
          your interests. Depending on their purpose, analysis and marketing
          cookies may be used in addition to technically necessary cookies. By
          clicking on &quot;Agree and continue&quot;, you declare your consent
          to the use of the aforementioned cookies. For further information,
          please refer to our{" "}
          <Link
            url='/privacy-policy'
            style={{ textDecoration: "underline" }}
          >
            privacy policy
          </Link>{" "}
          or you can{" "}
          <Link
            url='/'
            style={{ textDecoration: "underline" }}
            onClick={(e) => {
              e.preventDefault();
              triggerCookieConsentBanner({ showDetails: true });
            }}
            external
          >
            manage cookies preferences here
          </Link>
          .
        </CookieConsentBanner>
      </ContentProvider>
    </>
  );
};

export default WebApp;
