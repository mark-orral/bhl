import Card, * as CardElement from "@/components/atoms/Card";
import Avatar from "@/components/atoms/Avatar";
import { limitCharacters } from "@/lib/utils/limitCharacters";

const useCompanies = (posts) => {
  const cards = posts?.map((post) => {
    const {
      attributes: {
        avatar: { data: avatar },
      },
    } = post;

    return (
      <Card key={post.id} type="company">
        <CardElement.Body>
          <Avatar
            url={avatar?.attributes?.formats?.xsmall?.url}
            alt={avatar?.attributes?.alternativeText}
            size={{
              height: avatar?.attributes?.formats?.xsmall?.height,
              width: avatar?.attributes?.formats?.xsmall?.width,
            }}
          />
        </CardElement.Body>
        <CardElement.Body>
          <CardElement.Header
            title={{ text: post.attributes.name, limit: 60 }}
          />

          <CardElement.Features
            title={limitCharacters(post?.attributes?.slogan, 30)}
          />

          {post?.attributes?.description && (
            <CardElement.Text limit={75} multiline>
              {post?.attributes?.description}
            </CardElement.Text>
          )}
          <CardElement.Link url={`/directory/${post.attributes.slug}`} />
        </CardElement.Body>
      </Card>
    );
  });

  return cards;
};

export default useCompanies;
