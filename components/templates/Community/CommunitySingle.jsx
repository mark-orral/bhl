import SinglePageIntro from "@/components/molecules/SinglePageIntro";
import SinglePageShareBar from "@/components/molecules/SinglePageShareBar";
import SinglePageHero from "@/components/molecules/SinglePageHero";
import SinglePageSection from "@/components/molecules/SinglePageSection";
import MapWithDetails from "@/components/molecules/MapWithDetails";
import BackButton from "@/components/molecules/BackButton";
import Components from "@/components/molecules/Components";
import componentsList from "./componentsList";
import Results from "../Results";
import usePosts from "@/lib/hooks/usePosts";
import DateTimeList from "@/components/molecules/DateTimeList";
import SingleDate from "@/components/molecules/SingleDate";

export const CommunitySingle = ({ page, posts }) => {
  const category = page?.category?.data?.attributes?.slug;
  const cards = usePosts(posts);
  return (
    <>
      <BackButton href={`/community/all`} label="Community" />

      <SinglePageIntro
        title={page.title}
        avatar={page?.company?.data?.attributes?.avatar}
        category={category}
        company={{
          name: page?.company?.data?.attributes?.name,
          address: page?.company?.data?.attributes?.address,
        }}
        events_meta={page?.events_meta}
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

      {(page?.company?.data?.attributes?.name ||
        page?.company?.data?.attributes?.address ||
        (page?.company?.data?.attributes?.lat &&
          page?.company?.data?.attributes?.lng) ||
        page?.company?.data?.attributes?.website ||
        page?.company?.data?.attributes?.email_address ||
        page?.company?.data?.attributes?.phone_number ||
        page?.company?.data?.attributes?.google_maps_link ||
        page?.company?.data?.attributes?.citymapper_link) && (
        <SinglePageSection
          flex
          border
          heading="Venue details"
          component={
            <MapWithDetails
              company={{
                name: page?.company?.data?.attributes?.name,
                address: page?.company?.data?.attributes?.address,
                lat: page?.company?.data?.attributes?.lat,
                lng: page?.company?.data?.attributes?.lng,
                website: page?.company?.data?.attributes?.website,
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
      <SinglePageSection
        border
        heading={category === "news" ? "Related news" : "Related posts"}
        component={<Results list={cards} type={"related"}></Results>}
      />
    </>
  );
};
