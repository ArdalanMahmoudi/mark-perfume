import Image from "next/image";
import React from "react";



type PropType = {
  selected: boolean;
  image: {id?:string, url:string, alt?:string};
  onClick: () => void;
};

export const GalleryThumb = (props: PropType) => {
  const { selected, image, onClick } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : "",
      )}
    >
      
        <button
          onClick={onClick}
          type="button"
          className="embla-thumbs__slide__number"
        >
          <Image width={500} height={500} className="lg:w-18 lg:h-18 w-14 h-14 border-2 border-primary rounded-sm" src={image.url} alt={image.alt ?? ''}  /> 
        </button>
      
    </div>
  );
};
