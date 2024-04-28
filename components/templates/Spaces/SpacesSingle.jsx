import SinglePageIntro from "@/components/molecules/SinglePageIntro";
import SinglePageShareBar from "@/components/molecules/SinglePageShareBar";
import SinglePageHero from "@/components/molecules/SinglePageHero";
import SinglePageSection from "@/components/molecules/SinglePageSection";
import MapWithDetails from "@/components/molecules/MapWithDetails";
import Components from "@/components/molecules/Components";
import componentsList from "./componentsList";
import Results from "../Results";
import useSpaces from "@/lib/hooks/useSpaces";
import BackButton from "@/components/molecules/BackButton";
import RegisterForm from "@/components/organisms/RegisterForm";

export const SpacesSingle = ({ page, posts }) => {
  const cards = useSpaces(posts);
  return (
    <>
      <BackButton href={`/spaces/all`} label="Spaces" />
      <SinglePageIntro
        title={page.title}
        avatar={page?.company?.data?.attributes?.avatar}
        category={page?.category?.data?.attributes?.name}
        attributes={[`${page.size} sq ft`, page.term, `£${page.cost}`]}
      />

      <SinglePageShareBar
        mapLink={
          page?.company?.data?.attributes?.google_maps_link ||
          page?.company?.data?.attributes?.citymapper_link
        }
      />

      <SinglePageHero src={page?.hero?.images?.data} />

      <Components
        componentsData={page?.components}
        componentsList={componentsList}
      />

      {page?.location?.address && (
        <SinglePageSection
          flex
          border
          heading="Space location"
          component={
            <MapWithDetails
              company={{
                address: page?.location?.address,
                lat: page?.location?.lat,
                lng: page?.location?.lng,
                email_address: page?.company?.data?.attributes?.email_address,
                phone_number: page?.company?.data?.attributes?.phone_number,
                google_maps_link:
                  page?.company?.data?.attributes?.google_maps_link,
                citymapper_link:
                  page?.company?.data?.attributes?.citymapper_link,
              }}
            />
          }
        />
      )}

      {cards && cards.length && (
        <SinglePageSection
          border
          heading="Similar spaces"
          component={<Results list={cards} type={"related"}></Results>}
        />
      )}
      <div>
        <RegisterForm type={"content"} category={"space"} />
      </div>
    </>
  );
};
