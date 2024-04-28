import Page from "@/components/common/Page";
import { Single } from "@/components/templates/Community";

import getPostBySlug from "@/lib/services/strapi/posts/getPostBySlug";
import getPostCategories from "@/lib/services/strapi/posts/getPostCategories";
import getPosts from "@/lib/services/strapi/posts/getPosts";
import getResourcesCategories from "@/lib/services/strapi/resources/getResourcesCategories";
import getSpacesCategories from "@/lib/services/strapi/spaces/getSpacesCategories";

const CommunitySinglePage = ({ page, posts }) => {
  return (
    <Page seo={page.seo}>
      <Single
        page={page}
        posts={posts}
      />
    </Page>
  );
};

export default CommunitySinglePage;

export async function getServerSideProps({ params }) {
  const category = params?.category;
  const slug = params?.slug[0];

  const { data: relatedPosts } = await getPosts(1, 3, {
    category: {
      slug: {
        $eq: category,
      },
    },
  });

  const {
    data: { attributes: post },
  } = await getPostBySlug(slug);
  //! Need to fetch single post data including SEO information
  const page = {
    ...post,
    seo: {
      title: `${post.title} | Community ${post?.category?.data?.attributes?.name} `,
      description: "",
      robots: {
        index: "index",
        follow: "follow",
      },
    },
  };

  //* Example of how to render 404 on static pages
  if (!page) {
    return {
      notFound: true,
    };
  }

  const eventsCategoryData = getPostCategories();
  const spacesCategoryData = getSpacesCategories();
  const resourcesCategoryData = getResourcesCategories();

  const [eventsCategories, spacesCategories, resourcesCategories] =
    await Promise.all([
      eventsCategoryData,
      spacesCategoryData,
      resourcesCategoryData,
    ]);

  const footerCategories = {
    community: eventsCategories || null,
    spaces: spacesCategories || null,
    resources: resourcesCategories || null,
  };

  //* This will be passed to the page component as props
  return {
    props: { page, posts: relatedPosts, footerCategories },
  };
}
