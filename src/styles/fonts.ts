import localFont from 'next/font/local';

export const aspekta = localFont({
  preload: true,
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/Aspekta-50.ttf',
      weight: '50',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Aspekta-100.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Aspekta-200.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Aspekta-400.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Aspekta-500.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Aspekta-600.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Aspekta-700.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Aspekta-800.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-aspekta',
});