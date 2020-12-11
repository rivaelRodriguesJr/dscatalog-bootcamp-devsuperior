import React from "react"
import ContentLoader from "react-content-loader"
import { generateList } from "core/utils/list";

const Loader = () => (
  <ContentLoader
    speed={1}
    width={250}
    height={335}
    viewBox="0 0 250 335"
    backgroundColor="#ecebeb"
    foregroundColor="#d6d2d2"
  >
    <circle cx="115" cy="-209" r="15" />
    <rect x="142" y="-222" rx="2" ry="2" width="140" height="10" />
    <rect x="142" y="-206" rx="2" ry="2" width="140" height="10" />
    <rect x="0" y="0" rx="10" ry="10" width="250" height="335" />
  </ContentLoader>
);

const ProductCardLoader = () => {
  const loaderItems = generateList(3);
  return (
    <>
      {loaderItems.map(item => (
        <Loader key={item} />
      ))}
    </>
  );
}

export default ProductCardLoader