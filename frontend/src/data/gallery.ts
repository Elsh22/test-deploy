export type GalleryPhoto = {
  src: string;
  alt: string;
};

export type EventAlbum = {
  slug: string;
  title: string;
  keynoteSpeaker: string;
  cover: GalleryPhoto;
  photos: GalleryPhoto[];
};

const mastercardCover: GalleryPhoto = {
  src: "https://d6uqhuj15c85p.cloudfront.net/Events/mastercard-vacu-2026/cover.webp",
  alt: "Event photograph from the Mastercard × Virginia Credit Union General Body Meeting, featuring keynote speaker Bo Jackson",
};

// Add albums here and append CloudFront photo URLs to each album's photos array.
export const eventAlbums: EventAlbum[] = [
  {
    slug: "mastercard-vacu-2026",
    title: "Mastercard × Virginia Credit Union General Body Meeting",
    keynoteSpeaker: "Bo Jackson",
    cover: mastercardCover,
    photos: [mastercardCover],
  },
];
