import Card, * as CardElement from "@/components/atoms/Card";
const useSpaces = (posts) => {
  const cards = posts?.map((post = {}) => {
    return (
      <Card key={post.id} type={"spaces"}>
        <CardElement.Image
          src={
            post?.attributes?.hero?.images?.data[0]?.attributes?.formats?.medium
              ?.url || post?.attributes?.hero?.images?.data[0]?.attributes?.url
          }
          defaultType={"/images/defaults/spaces.jpeg"}
          alt={
            post?.attributes?.hero?.images?.data[0]?.attributes?.alternativeText
          }
        />
        <CardElement.Body>
          <CardElement.Tags
            category={post.attributes.category.data?.attributes.name}
            share
          />
        </CardElement.Body>
        <CardElement.Body>
          <CardElement.Header title={{ text: post.attributes.title }} />
          {post.attributes.category.data?.attributes.name &&
          post.attributes.size ? (
            <CardElement.Text>{`${
              post.attributes.size +
              " SQ FT / " +
              post.attributes.category.data.attributes.name
            }`}</CardElement.Text>
          ) : (
            <CardElement.Text>{`${
              post.attributes.size + " SQ FT"
            }`}</CardElement.Text>
          )}
        </CardElement.Body>
        {post.attributes.external_url ? (
          <CardElement.Link
            external
            showIcon={false}
            url={post.attributes.external_url}
          />
        ) : (
          <CardElement.Link
            showIcon={false}
            url={`/spaces/${post?.attributes?.category?.data?.attributes?.slug}/${post.attributes.slug}`}
          />
        )}
        <CardElement.Footer
          date={post.attributes.date_available}
          time=""
          price={post.attributes.cost}
          term={post.attributes.term}
        >
          Available
        </CardElement.Footer>
      </Card>
    );
  });

  return cards;
};

export default useSpaces;
