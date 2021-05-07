import { GatsbyImageFluidProps } from 'gatsby-image';

export interface RawDocument<T = GatsbyImageFluidProps> {
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

export interface Member<AvatarImageType = GatsbyImageFluidProps> {
  name: string;
  role?: string;
  email?: string;
  avatar: AvatarImageType;
}
export interface NewsArticle<
  AuthorImageType = GatsbyImageFluidProps,
  FeatureImageType = GatsbyImageFluidProps,
  GalleryImageType = GatsbyImageFluidProps,
  ThumbImageType = GatsbyImageFluidProps,
> {
  author: Member<AuthorImageType>;
  body: RawDocument;
  date: string;
  feature: FeatureImageType;
  gallery: GalleryImageType[];
  slug: string;
  tag: string;
  thumbnail: ThumbImageType;
  title: string;
}

export type CUSTOM_BLOCK = 'youtube';
