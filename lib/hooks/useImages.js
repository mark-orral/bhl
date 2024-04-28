import Image from "@/components/atoms/Image";
import cmsFetch from "@/utils/cmsFetch";

const useImages = (images) => {
  return images?.map((item, index) => {
    return (
      <Image
        key={index}
        src={cmsFetch(item?.formats?.large?.url || item?.url)}
        alt={item?.alternativeText}
        fill
        objectFit="cover"
      />
    );
  });

  //   return images;
};

export default useImages;
