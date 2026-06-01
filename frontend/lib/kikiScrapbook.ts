/**
 * The Kiki digital scrapbook — 63 photos from Richard Triberg's PDF
 * 'The Extraordinary Life & Times of the Immortal Kiki'.
 * Photos served from /public/kiki-scrapbook/, 2x LANCZOS upscaled JPEG.
 */

export interface KikiPhoto {
  filename: string;
  src: string;
  pageRef: number;
}

export const KIKI_PHOTOS: KikiPhoto[] = [
  { filename: 'kiki_p01_i01.jpg', src: '/kiki-scrapbook/kiki_p01_i01.jpg', pageRef: 1 },
  { filename: 'kiki_p01_i02.jpg', src: '/kiki-scrapbook/kiki_p01_i02.jpg', pageRef: 1 },
  { filename: 'kiki_p01_i03.jpg', src: '/kiki-scrapbook/kiki_p01_i03.jpg', pageRef: 1 },
  { filename: 'kiki_p01_i05.jpg', src: '/kiki-scrapbook/kiki_p01_i05.jpg', pageRef: 1 },
  { filename: 'kiki_p01_i06.jpg', src: '/kiki-scrapbook/kiki_p01_i06.jpg', pageRef: 1 },
  { filename: 'kiki_p01_i07.jpg', src: '/kiki-scrapbook/kiki_p01_i07.jpg', pageRef: 1 },
  { filename: 'kiki_p01_i08.jpg', src: '/kiki-scrapbook/kiki_p01_i08.jpg', pageRef: 1 },
  { filename: 'kiki_p01_i15.jpg', src: '/kiki-scrapbook/kiki_p01_i15.jpg', pageRef: 1 },
  { filename: 'kiki_p01_i16.jpg', src: '/kiki-scrapbook/kiki_p01_i16.jpg', pageRef: 1 },
  { filename: 'kiki_p01_i18.jpg', src: '/kiki-scrapbook/kiki_p01_i18.jpg', pageRef: 1 },
  { filename: 'kiki_p01_i20.jpg', src: '/kiki-scrapbook/kiki_p01_i20.jpg', pageRef: 1 },
  { filename: 'kiki_p01_i22.jpg', src: '/kiki-scrapbook/kiki_p01_i22.jpg', pageRef: 1 },
  { filename: 'kiki_p02_i01.jpg', src: '/kiki-scrapbook/kiki_p02_i01.jpg', pageRef: 2 },
  { filename: 'kiki_p02_i02.jpg', src: '/kiki-scrapbook/kiki_p02_i02.jpg', pageRef: 2 },
  { filename: 'kiki_p02_i03.jpg', src: '/kiki-scrapbook/kiki_p02_i03.jpg', pageRef: 2 },
  { filename: 'kiki_p02_i05.jpg', src: '/kiki-scrapbook/kiki_p02_i05.jpg', pageRef: 2 },
  { filename: 'kiki_p03_i02.jpg', src: '/kiki-scrapbook/kiki_p03_i02.jpg', pageRef: 3 },
  { filename: 'kiki_p04_i00.jpg', src: '/kiki-scrapbook/kiki_p04_i00.jpg', pageRef: 4 },
  { filename: 'kiki_p05_i00.jpg', src: '/kiki-scrapbook/kiki_p05_i00.jpg', pageRef: 5 },
  { filename: 'kiki_p06_i02.jpg', src: '/kiki-scrapbook/kiki_p06_i02.jpg', pageRef: 6 },
  { filename: 'kiki_p06_i03.jpg', src: '/kiki-scrapbook/kiki_p06_i03.jpg', pageRef: 6 },
  { filename: 'kiki_p06_i05.jpg', src: '/kiki-scrapbook/kiki_p06_i05.jpg', pageRef: 6 },
  { filename: 'kiki_p06_i06.jpg', src: '/kiki-scrapbook/kiki_p06_i06.jpg', pageRef: 6 },
  { filename: 'kiki_p07_i01.jpg', src: '/kiki-scrapbook/kiki_p07_i01.jpg', pageRef: 7 },
  { filename: 'kiki_p07_i02.jpg', src: '/kiki-scrapbook/kiki_p07_i02.jpg', pageRef: 7 },
  { filename: 'kiki_p08_i01.jpg', src: '/kiki-scrapbook/kiki_p08_i01.jpg', pageRef: 8 },
  { filename: 'kiki_p08_i02.jpg', src: '/kiki-scrapbook/kiki_p08_i02.jpg', pageRef: 8 },
  { filename: 'kiki_p08_i03.jpg', src: '/kiki-scrapbook/kiki_p08_i03.jpg', pageRef: 8 },
  { filename: 'kiki_p09_i01.jpg', src: '/kiki-scrapbook/kiki_p09_i01.jpg', pageRef: 9 },
  { filename: 'kiki_p09_i06.jpg', src: '/kiki-scrapbook/kiki_p09_i06.jpg', pageRef: 9 },
  { filename: 'kiki_p09_i08.jpg', src: '/kiki-scrapbook/kiki_p09_i08.jpg', pageRef: 9 },
  { filename: 'kiki_p09_i10.jpg', src: '/kiki-scrapbook/kiki_p09_i10.jpg', pageRef: 9 },
  { filename: 'kiki_p09_i12.jpg', src: '/kiki-scrapbook/kiki_p09_i12.jpg', pageRef: 9 },
  { filename: 'kiki_p10_i01.jpg', src: '/kiki-scrapbook/kiki_p10_i01.jpg', pageRef: 10 },
  { filename: 'kiki_p10_i03.jpg', src: '/kiki-scrapbook/kiki_p10_i03.jpg', pageRef: 10 },
  { filename: 'kiki_p11_i01.jpg', src: '/kiki-scrapbook/kiki_p11_i01.jpg', pageRef: 11 },
  { filename: 'kiki_p12_i01.jpg', src: '/kiki-scrapbook/kiki_p12_i01.jpg', pageRef: 12 },
  { filename: 'kiki_p12_i03.jpg', src: '/kiki-scrapbook/kiki_p12_i03.jpg', pageRef: 12 },
  { filename: 'kiki_p13_i00.jpg', src: '/kiki-scrapbook/kiki_p13_i00.jpg', pageRef: 13 },
  { filename: 'kiki_p13_i01.jpg', src: '/kiki-scrapbook/kiki_p13_i01.jpg', pageRef: 13 },
  { filename: 'kiki_p13_i02.jpg', src: '/kiki-scrapbook/kiki_p13_i02.jpg', pageRef: 13 },
  { filename: 'kiki_p14_i01.jpg', src: '/kiki-scrapbook/kiki_p14_i01.jpg', pageRef: 14 },
  { filename: 'kiki_p14_i03.jpg', src: '/kiki-scrapbook/kiki_p14_i03.jpg', pageRef: 14 },
  { filename: 'kiki_p14_i05.jpg', src: '/kiki-scrapbook/kiki_p14_i05.jpg', pageRef: 14 },
  { filename: 'kiki_p15_i02.jpg', src: '/kiki-scrapbook/kiki_p15_i02.jpg', pageRef: 15 },
  { filename: 'kiki_p15_i03.jpg', src: '/kiki-scrapbook/kiki_p15_i03.jpg', pageRef: 15 },
  { filename: 'kiki_p15_i04.jpg', src: '/kiki-scrapbook/kiki_p15_i04.jpg', pageRef: 15 },
  { filename: 'kiki_p15_i05.jpg', src: '/kiki-scrapbook/kiki_p15_i05.jpg', pageRef: 15 },
  { filename: 'kiki_p15_i07.jpg', src: '/kiki-scrapbook/kiki_p15_i07.jpg', pageRef: 15 },
  { filename: 'kiki_p15_i08.jpg', src: '/kiki-scrapbook/kiki_p15_i08.jpg', pageRef: 15 },
  { filename: 'kiki_p15_i09.jpg', src: '/kiki-scrapbook/kiki_p15_i09.jpg', pageRef: 15 },
  { filename: 'kiki_p16_i01.jpg', src: '/kiki-scrapbook/kiki_p16_i01.jpg', pageRef: 16 },
  { filename: 'kiki_p16_i02.jpg', src: '/kiki-scrapbook/kiki_p16_i02.jpg', pageRef: 16 },
  { filename: 'kiki_p16_i03.jpg', src: '/kiki-scrapbook/kiki_p16_i03.jpg', pageRef: 16 },
  { filename: 'kiki_p16_i04.jpg', src: '/kiki-scrapbook/kiki_p16_i04.jpg', pageRef: 16 },
  { filename: 'kiki_p16_i05.jpg', src: '/kiki-scrapbook/kiki_p16_i05.jpg', pageRef: 16 },
  { filename: 'kiki_p16_i06.jpg', src: '/kiki-scrapbook/kiki_p16_i06.jpg', pageRef: 16 },
  { filename: 'kiki_p16_i07.jpg', src: '/kiki-scrapbook/kiki_p16_i07.jpg', pageRef: 16 },
  { filename: 'kiki_p17_i01.jpg', src: '/kiki-scrapbook/kiki_p17_i01.jpg', pageRef: 17 },
  { filename: 'kiki_p17_i03.jpg', src: '/kiki-scrapbook/kiki_p17_i03.jpg', pageRef: 17 },
  { filename: 'kiki_p17_i05.jpg', src: '/kiki-scrapbook/kiki_p17_i05.jpg', pageRef: 17 },
  { filename: 'kiki_p17_i07.jpg', src: '/kiki-scrapbook/kiki_p17_i07.jpg', pageRef: 17 },
  { filename: 'kiki_p17_i09.jpg', src: '/kiki-scrapbook/kiki_p17_i09.jpg', pageRef: 17 },
];

export const KIKI_PHOTO_COUNT = 63;