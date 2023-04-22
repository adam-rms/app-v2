import { IonSlides, IonSlide, IonImg } from "@ionic/react";

interface ImageSlideshowProps {
  images: IThumbnail[];
}

const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ images }) => {
  return (
    <IonSlides>
      {images.map((image: IThumbnail) => {
        return (
          <IonSlide key={image.s3files_name}>
            <IonImg src={image.url} alt={image.s3files_name} />
          </IonSlide>
        );
      })}
    </IonSlides>
  );
};

export default ImageSlideshow;
