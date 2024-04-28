import SinglePageIntro from "@/components/molecules/SinglePageIntro";
import SinglePageShareBar from "@/components/molecules/SinglePageShareBar";
import SinglePageHero from "@/components/molecules/SinglePageHero";

import Components from "@/components/molecules/Components";
import componentsList from "./componentsList";
import NewsletterForm from "@/components/organisms/NewsletterForm";
import SinglePageSection from "@/components/molecules/SinglePageSection";

export const ResourcesSingle = ({ page }) => {
  return (
    <>
      <SinglePageIntro
        title={page.title}
        company={page?.company?.data?.attributes}
        avatar={page?.company?.data?.attributes?.avatar}
        category={page?.category?.data?.attributes?.name}
      />

      <SinglePageShareBar
        mapLink={
          page?.company?.data?.attributes?.google_maps_link ||
          page?.company?.data?.attributes?.citymapper_link
        }
      />

      <SinglePageHero src={page?.hero?.images?.data} />
      <SinglePageSection flex />

      <Components
        componentsData={page?.components}
        componentsList={componentsList}
      />
      <NewsletterForm />
    </>
  );
};
