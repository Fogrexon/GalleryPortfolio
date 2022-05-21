import GalleryWrapper from "../components/gallery/galleryitem";
import Header from "../components/utils/Header";
import Inner from "../components/utils/inner";

const Gallery = () => (
  <>
    <Header title="Gallery" current="gallery" />
    <Inner>
      <GalleryWrapper />
    </Inner>
  </>
);

export default Gallery;
