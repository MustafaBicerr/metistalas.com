export type FocalPoint = {
  x: number;
  y: number;
};

export type MediaPair = {
  id: string;
  desktop: string;
  mobile: string;
  widthDesktop: number;
  heightDesktop: number;
  widthMobile: number;
  heightMobile: number;
  alt: {
    tr: string;
    en: string;
  };
  focal: {
    desktop: FocalPoint;
    mobile: FocalPoint;
  };
  preload?: boolean;
  caption?: {
    tr: string;
    en: string;
  };
};
