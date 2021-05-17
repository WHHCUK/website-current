import { FluidObject } from 'gatsby-image';

export interface RawDocument<T = FluidImageProps> {
  raw: string;
  references?: {
    contentful_id: string;
    description: string;
    file: T & {
      contentType: 'image/jpeg';
      details: {
        size: number;
      };
      fileName: string;
      url: string;
    };
  }[];
}

export const isRawDocument = (document: any): document is RawDocument =>
  document.hasOwnProperty('raw');

export interface Affiliate<AffiliateImageType = FluidImageProps> {
  name: string;
  url: string;
  logo: AffiliateImageType;
}

export interface Homepage<HeroImageType = FluidImageProps> {
  heroHeading: string;
  heroText: string;
  heroImage: HeroImageType;
  affiliateHeading: string;
  affiliates: Affiliate[];
}

export interface Member<AvatarImageType = FluidImageProps> {
  name: string;
  role?: string;
  email?: string;
  avatar: AvatarImageType;
}

export interface NewsArticle<
  AuthorImageType = FluidImageProps,
  FeatureImageType = FluidImageProps,
  GalleryImageType = FluidImageProps,
  ThumbImageType = FluidImageProps,
> {
  author: Member<AuthorImageType>;
  body: RawDocument;
  date: string;
  feature: FeatureImageType;
  gallery: GalleryImageType[] | undefined;
  slug: string;
  tag: string;
  thumbnail: ThumbImageType;
  title: string;
}

export type CUSTOM_BLOCK = 'youtube';

export interface FluidImageProps {
  fluid: FluidObject;
}
