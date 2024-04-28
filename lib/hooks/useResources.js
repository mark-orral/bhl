import Card, * as CardElement from "@/components/atoms/Card";

const lookup = {
  "Advice + Guidance": "advice",
  "Training Courses": "training",
};
const useResources = (posts) => {
  const cards = posts?.map((post = {}) => {
    return (
      <Card
        key={post.id}
        type={"resources"}
        subType={lookup[post.attributes.category.data?.attributes.name]}
      >
        <CardElement.Body>
          <CardElement.Tags
            category={post.attributes.category.data?.attributes.name}
            business={post.attributes.company.data?.attributes.name}
          />
          <CardElement.Image
            src={
              post?.attributes?.hero?.images?.data[0]?.attributes?.formats
                ?.medium?.url ||
              post?.attributes?.hero?.images?.data[0]?.attributes?.url
            }
            alt={
              post?.attributes?.hero?.images?.data[0]?.attributes
                ?.alternativeText
            }
          />
        </CardElement.Body>
        <CardElement.Body>
          <CardElement.Header title={{ text: post.attributes.title }} />
          <CardElement.Text>{post.attributes.description}</CardElement.Text>
        </CardElement.Body>
        {post.attributes.external_url ? (
          <CardElement.Link
            external={true}
            url={post.attributes.external_url}
          />
        ) : (
          <CardElement.Link
            url={`/skills-and-training/${post?.attributes?.category?.data?.attributes?.slug}/${post.attributes.slug}`}
          />
        )}
      </Card>
    );
  });

  return cards;
};

export default useResources;
