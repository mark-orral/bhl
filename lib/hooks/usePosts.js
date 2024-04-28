import Card, * as CardElement from "@/components/atoms/Card";

const usePosts = (posts) => {
  const cards = posts?.map((post = {}) => {
    switch (post?.attributes?.category?.data?.attributes?.slug) {
      case "notices":
        return (
          <Card
            key={post.id}
            type={post?.attributes?.category?.data?.attributes?.slug}
          >
            <CardElement.Body>
              <CardElement.Tags
                category={post.attributes.category.data?.attributes.name}
                business={post.attributes.company.data?.attributes.name}
              />
              <CardElement.Header
                title={{ text: post.attributes.title, limit: 30 }}
                avatar={
                  post?.attributes?.company?.data?.attributes?.avatar?.data
                }
                displayAvatar
              />
              <CardElement.Features
                title={post.attributes.company.data?.attributes.name}
                description={[post.attributes.company.data?.attributes.address]}
              />
              <CardElement.Text limit={200} multiline>
                {post.attributes.description}
              </CardElement.Text>
              <CardElement.Footer date={post.attributes.date_end} />
            </CardElement.Body>
          </Card>
        );
      case "events":
        return (
          <Card
            key={post.id}
            type={post?.attributes?.category?.data?.attributes?.slug}
          >
            <CardElement.Image
              src={
                post?.attributes?.hero?.images?.data
                  ? post?.attributes?.hero?.images?.data[0]?.attributes?.formats
                      ?.medium?.url ||
                    post?.attributes?.hero?.images?.data[0]?.attributes?.url
                  : false
              }
              alt={
                post?.attributes?.hero?.images?.data &&
                post?.attributes?.hero?.images?.data[0]?.attributes
                  ?.alternativeText
              }
            />

            <CardElement.Body>
              <CardElement.Tags
                occurance={post.attributes?.events_meta?.occurrence}
                category={post.attributes.category.data?.attributes.name}
                business={post.attributes.company.data?.attributes.name}
              />
            </CardElement.Body>
            <CardElement.Body>
              <CardElement.Header
                title={{ text: post.attributes.title, limit: 40 }}
              />
              <CardElement.Text limit={120}>
                {post.attributes.description}
              </CardElement.Text>
            </CardElement.Body>
            <CardElement.Link
              url={`/community/${post.attributes.category.data.attributes.slug}/${post.attributes.slug}`}
            />
          </Card>
        );
      case "news":
        return (
          <Card
            key={post.id}
            type={post?.attributes?.category?.data?.attributes?.slug}
          >
            <CardElement.Body>
              <CardElement.Tags
                category={post.attributes.category.data?.attributes.name}
                business={post.attributes.company.data?.attributes.name}
              />
              <CardElement.Image
                src={
                  post?.attributes?.hero?.images?.data
                    ? post?.attributes?.hero?.images?.data[0]?.attributes
                        ?.formats?.medium?.url ||
                      post?.attributes?.hero?.images?.data[0]?.attributes?.url
                    : false
                }
                alt={
                  post?.attributes?.hero?.images?.data &&
                  post?.attributes?.hero?.images?.data[0]?.attributes
                    ?.alternativeText
                }
              />
            </CardElement.Body>
            <CardElement.Body>
              <CardElement.Header
                title={{ text: post.attributes.title, limit: 45 }}
              />
              <CardElement.Text>{post.attributes.description}</CardElement.Text>
            </CardElement.Body>
            <CardElement.Link
              url={`/community/${post.attributes.category.data.attributes.slug}/${post.attributes.slug}`}
            />
          </Card>
        );
      case "jobs":
        return (
          <Card
            key={post.id}
            type={post?.attributes?.category?.data?.attributes?.slug}
          >
            <CardElement.Body>
              <CardElement.Tags
                category={post.attributes.category.data?.attributes.name}
                business={post.attributes.company.data?.attributes.name}
              />
              <CardElement.Header
                title={{ text: post.attributes.title, limit: 30 }}
                avatar={
                  post?.attributes?.company?.data?.attributes?.avatar?.data
                }
                displayAvatar
              />
              <CardElement.Features
                title={post.attributes.company.data?.attributes.name}
                description={[
                  post.attributes?.jobs_meta?.type,
                  post.attributes?.jobs_meta?.salary,
                ]}
              />
              <CardElement.Text limit={200} multiline>
                {post.attributes.description}
              </CardElement.Text>
              <CardElement.Footer date={post.attributes.date_end} time="">
                Application closes
              </CardElement.Footer>
            </CardElement.Body>
            <CardElement.Link
              url={`/community/${post.attributes.category.data.attributes.slug}/${post.attributes.slug}`}
            />
          </Card>
        );
      default:
        return (
          <Card key={post.id} type={"news"}>
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
            <CardElement.Link
              url={`/community/${post?.attributes?.category?.data?.attributes?.slug}/${post.attributes.slug}`}
            />
          </Card>
        );
    }
  });

  return cards;
};

export default usePosts;
