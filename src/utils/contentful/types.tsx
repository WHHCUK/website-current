import { FluidObject } from 'gatsby-image';

interface BaseField {
  label: string;
  helpText?: string;
  required: boolean;
  weight: number;
}

export type TextFieldVariation = 'short' | 'long' | 'email';
export type ChoiceFieldVariation = 'dropdown' | 'radio' | 'checkbox';

type TextField = BaseField & {
  type: 'text';
  variation: TextFieldVariation;
  autoComplete?: string;
};

export type Options = Record<string, string>;

type ChoiceField = BaseField & {
  type: 'choice';
  variation: ChoiceFieldVariation;
  options: Options;
};

export type Field = TextField | ChoiceField;

export type FormItems = Record<string, Field>;

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

export interface Page {
  body: RawDocument;
  slug: string;
  title: string;
}

export type CUSTOM_BLOCK = 'citymapper' | 'form' | 'member' | 'youtube';

export interface FluidImageProps {
  fluid: FluidObject;
}
