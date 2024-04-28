import SinglePageIntro from "@/components/molecules/SinglePageIntro";
import SinglePageHero from "@/components/molecules/SinglePageHero";
import BackButton from "@/components/molecules/BackButton";
import Components from "@/components/molecules/Components";
import componentsList from "./componentsList";
import NewsletterForm from "@/components/organisms/NewsletterForm";

export const PagesSingle = ({ page }) => {
  return (
    <>
      <BackButton />

      <SinglePageIntro
        title={page.title}
        displayAvatar={false}
      />

      <SinglePageHero src={page?.hero?.images?.data} />

      <Components
        componentsData={page?.components}
        componentsList={componentsList}
      />

      <NewsletterForm />
    </>
  );
};
