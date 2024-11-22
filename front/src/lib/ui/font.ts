import localFont from 'next/font/local'

export const fontDefault = localFont({
  src: [
    {
      path: './fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'bold'
    },
    {
      path: './fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'medium'
    },
    {
      path: './fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-default'
})
