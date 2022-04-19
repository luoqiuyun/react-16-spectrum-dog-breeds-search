import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import { Image } from "@adobe/react-spectrum";
import "react-image-lightbox/style.css";

const ImageLightbox = ({ pic }: ImgProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span className="imgspan" onMouseEnter={() => setIsOpen(true)}>
        <Image src={pic} alt="breeds" />
      </span>
      {isOpen && (
        <Lightbox mainSrc={pic} onCloseRequest={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default ImageLightbox;

interface ImgProps {
  pic: string;
}
