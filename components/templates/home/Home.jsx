import Hero from "@/components/organisms/Hero";
import PostsSlider from "@/components/organisms/PostsSlider";
import Blockquote from "@/components/organisms/Blockquote";
import FeaturedPost from "@/components/organisms/FeaturedPost";
import TickerBanner from "@/components/molecules/TickerBanner";
import CategoriesGraph from "@/components/organisms/CategoriesGraph";
import NewsletterForm from "@/components/organisms/NewsletterForm";
import QuickLinks from "@/components/organisms/QuickLinks";
import RegisterForm from "@/components/organisms/RegisterForm";

const bannerData = [
  {
    title: "Vibrant",
  },
  {
    title: "Independent",
  },
  {
    title: "Diverse",
  },
];

const Home = ({ content, posts, businessCategories, businessCount }) => {
  return (
    <>
      <Hero />
      <Blockquote
        person={content.Quote_home.Author || "GRACE WILLIAMS"}
        business={
          content.Quote_home.Company || "LEADER OF WALTHAM FOREST COUNCIL"
        }
      >
        {content?.Quote_home.Quote ||
          `Creativity is everywhere in Waltham Forest. Nowhere is this easier to
        see than in Blackhorse Lane. Everywhere you turn, there&apos;s a
        creative business or collective of artists doing something inventive and
        extraordinary, and this creativity is what Blackhorse Lane stands for.`}
      </Blockquote>
      <PostsSlider posts={posts} />
      <NewsletterForm />
      <FeaturedPost post={content.Featured_post.data.attributes} />
      <TickerBanner
        content={bannerData}
        repeat={10}
        direction='left'
      />
      <CategoriesGraph
        categories={businessCategories}
        count={businessCount}
      />
      <QuickLinks Quicklinks={content.Quicklinks} />
      <RegisterForm
        type={"content"}
        category={"business"}
      />
    </>
  );
};

export default Home;
