import SinglePageIntro from "@/components/molecules/SinglePageIntro";
import SinglePageSection from "@/components/molecules/SinglePageSection";
import SinglePageShareBar from "@/components/molecules/SinglePageShareBar";
import SinglePageHero from "@/components/molecules/SinglePageHero";
import MapWithDetails from "@/components/molecules/MapWithDetails/";
import Link from "@/components/atoms/Link";
import BackButton from "@/components/molecules/BackButton";
import Components from "@/components/molecules/Components";
import componentsList from "./componentsList";
import RegisterForm from "@/components/organisms/RegisterForm";

export const DirectorySingle = ({ page }) => {
  return (
    <>
      <BackButton href={`/directory`} label="Directory" />

      <SinglePageIntro
        title={page.name}
        avatar={page?.avatar}
        category={page?.category?.data?.attributes?.slug}
        company={{
          slogan: page?.slogan,
        }}
      />

      <SinglePageShareBar
        mapLink={page?.google_maps_link || page?.citymapper_link}
      />

      <SinglePageHero src={page?.hero?.images?.data} />

      <Components
        componentsData={page?.components}
        componentsList={componentsList}
      />

      <SinglePageSection
        flex
        border
        heading="Business info"
        component={
          <MapWithDetails
            company={{
              name: page?.name,
              address: page?.address,
              lat: page?.lat,
              lng: page?.lng,
              website: page?.website,
              email_address: page?.email_address,
              phone_number: page?.phone_number,
              google_maps_link: page?.google_maps_link,
              citymapper_link: page?.citymapper_link,
              size: page?.size,
            }}
          />
        }
      />
      <SinglePageSection
        component={
          <Link url="/directory" type="button--block">
            View Full Directory
          </Link>
        }
      />
      <RegisterForm type={"content"} category={"business"} />
    </>
  );
};
