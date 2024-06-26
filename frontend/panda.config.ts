import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  presets: ['@pandacss/preset-base', '@park-ui/panda-preset'],

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          common: {
            100: {
              value: '#ffffff',
            },
            0: {
              value: '#000000',
            },
          },
          slate: {
            50: { value: '#F8FAFC' },
            100: { value: '#F1F5F9' },
            200: { value: '#E2E8F0' },
            300: { value: '#CBD5E1' },
            400: { value: '#94A3B8' },
            500: { value: '#64748B' },
            600: { value: '#475569' },
            700: { value: '#334155' },
            800: { value: '#1E293B' },
            900: { value: '#0F172A' },
            950: { value: '#020617' },
          },
          gray: {
            50: { value: '#F9FAFB' },
            100: { value: '#F3F4F6' },
            200: { value: '#E5E7EB' },
            300: { value: '#D1D5DB' },
            400: { value: '#9CA3AF' },
            500: { value: '#6B7280' },
            600: { value: '#4B5563' },
            700: { value: '#374151' },
            800: { value: '#1F2937' },
            900: { value: '#111827' },
            950: { value: '#030712' },
          },
          zinc: {
            50: { value: '#FAFAFA' },
            100: { value: '#F4F4F5' },
            200: { value: '#E4E4E7' },
            300: { value: '#D4D4D8' },
            400: { value: '#A1A1AA' },
            500: { value: '#71717A' },
            600: { value: '#52525B' },
            700: { value: '#3F3F46' },
            800: { value: '#27272A' },
            900: { value: '#18181B' },
            950: { value: '#09090B' },
          },
          neutral: {
            50: { value: '#FAFAFA' },
            100: { value: '#F5F5F5' },
            200: { value: '#E5E5E5' },
            300: { value: '#D4D4D4' },
            400: { value: '#A3A3A3' },
            500: { value: '#737373' },
            600: { value: '#525252' },
            700: { value: '#404040' },
            800: { value: '#262626' },
            900: { value: '#171717' },
            950: { value: '#0A0A0A' },
          },
          stone: {
            50: { value: '#FAFAF9' },
            100: { value: '#F5F5F4' },
            200: { value: '#E7E5E4' },
            300: { value: '#D6D3D1' },
            400: { value: '#A8A29E' },
            500: { value: '#78716C' },
            600: { value: '#57534E' },
            700: { value: '#44403C' },
            800: { value: '#292524' },
            900: { value: '#1C1917' },
            950: { value: '#0C0A09' },
          },
          yellow: {
            50: { value: '#FEFCE8' },
            100: { value: '#FEF9C3' },
            200: { value: '#FEF08A' },
            300: { value: '#FDE047' },
            400: { value: '#FACC15' },
            500: { value: '#EAB308' },
            600: { value: '#CA8A04' },
            700: { value: '#A16207' },
            800: { value: '#854D0E' },
            900: { value: '#713F12' },
            950: { value: '#422006' },
          },
          lime: {
            50: { value: '#F8FCE9' },
            100: { value: '#EFF8CF' },
            200: { value: '#DEF2A4' },
            300: { value: '#CDEA80' },
            400: { value: '#AED843' },
            500: { value: '#8FBE24' },
            600: { value: '#6F9818' },
            700: { value: '#557417' },
            800: { value: '#445C18' },
            900: { value: '#3B4E19' },
            950: { value: '#1D2B08' },
          },
          red: {
            50: { value: '#FEF2F2' },
            100: { value: '#FEE2E2' },
            200: { value: '#FECACA' },
            300: { value: '#FCA5A5' },
            400: { value: '#F87171' },
            500: { value: '#EF4444' },
            600: { value: '#DC2626' },
            700: { value: '#B91C1C' },
            800: { value: '#991B1B' },
            900: { value: '#7F1D1D' },
            950: { value: '#450A0A' },
          },
          orange: {
            50: { value: '#FFF7ED' },
            100: { value: '#FFEDD5' },
            200: { value: '#FED7AA' },
            300: { value: '#FDBA74' },
            400: { value: '#FB923C' },
            500: { value: '#F97316' },
            600: { value: '#EA580C' },
            700: { value: '#C2410C' },
            800: { value: '#9A3412' },
            900: { value: '#7C2D12' },
            950: { value: '#431407' },
          },
          amber: {
            50: { value: '#FFFBEB' },
            100: { value: '#FEF3C7' },
            200: { value: '#FDE68A' },
            300: { value: '#FCD34D' },
            400: { value: '#FBBF24' },
            500: { value: '#F59E0B' },
            600: { value: '#D97706' },
            700: { value: '#B45309' },
            800: { value: '#92400E' },
            900: { value: '#78350F' },
            950: { value: '#451A03' },
          },
          green: {
            50: { value: '#F0FDF4' },
            100: { value: '#DCFCE7' },
            200: { value: '#BBF7D0' },
            300: { value: '#86EFAC' },
            400: { value: '#4ADE80' },
            500: { value: '#22C55E' },
            600: { value: '#16A34A' },
            700: { value: '#15803D' },
            800: { value: '#166534' },
            900: { value: '#14532D' },
            950: { value: '#052E16' },
          },
          emerald: {
            50: { value: '#ECFDF5' },
            100: { value: '#D1FAE5' },
            200: { value: '#A7F3D0' },
            300: { value: '#6EE7B7' },
            400: { value: '#34D399' },
            500: { value: '#10B981' },
            600: { value: '#059669' },
            700: { value: '#047857' },
            800: { value: '#065F46' },
            900: { value: '#064E3B' },
            950: { value: '#022C22' },
          },
          teal: {
            50: { value: '#F0FDFA' },
            100: { value: '#CCFBF1' },
            200: { value: '#99F6E4' },
            300: { value: '#5EEAD4' },
            400: { value: '#2DD4BF' },
            500: { value: '#14B8A6' },
            600: { value: '#0D9488' },
            700: { value: '#0F766E' },
            800: { value: '#115E59' },
            900: { value: '#134E4A' },
            950: { value: '#042F2E' },
          },
          cyan: {
            50: { value: '#ECFEFF' },
            100: { value: '#CFFAFE' },
            200: { value: '#A5F3FC' },
            300: { value: '#67E8F9' },
            400: { value: '#22D3EE' },
            500: { value: '#06B6D4' },
            600: { value: '#0891B2' },
            700: { value: '#0E7490' },
            800: { value: '#155E75' },
            900: { value: '#164E63' },
            950: { value: '#083344' },
          },
          sky: {
            50: { value: '#F0F9FF' },
            100: { value: '#E0F2FE' },
            200: { value: '#BAE6FD' },
            300: { value: '#7DD3FC' },
            400: { value: '#38BDF8' },
            500: { value: '#0EA5E9' },
            600: { value: '#0284C7' },
            700: { value: '#0369A1' },
            800: { value: '#075985' },
            900: { value: '#0C4A6E' },
            950: { value: '#082F49' },
          },
          blue: {
            50: { value: '#EFF6FF' },
            100: { value: '#DBEAFE' },
            200: { value: '#BFDBFE' },
            300: { value: '#93C5FD' },
            400: { value: '#60A5FA' },
            500: { value: '#3B82F6' },
            600: { value: '#2563EB' },
            700: { value: '#1D4ED8' },
            800: { value: '#1E40AF' },
            900: { value: '#1E3A8A' },
            950: { value: '#172554' },
          },
          indigo: {
            50: { value: '#EEF2FF' },
            100: { value: '#E0E7FF' },
            200: { value: '#C7D2FE' },
            300: { value: '#A5B4FC' },
            400: { value: '#818CF8' },
            500: { value: '#6366F1' },
            600: { value: '#4F46E5' },
            700: { value: '#4338CA' },
            800: { value: '#3730A3' },
            900: { value: '#312E81' },
            950: { value: '#1E1B4B' },
          },
          violet: {
            50: { value: '#F5F3FF' },
            100: { value: '#EDE9FE' },
            200: { value: '#DDD6FE' },
            300: { value: '#C4B5FD' },
            400: { value: '#A78BFA' },
            500: { value: '#8B5CF6' },
            600: { value: '#7C3AED' },
            700: { value: '#6D28D9' },
            800: { value: '#5B21B6' },
            900: { value: '#4C1D95' },
            950: { value: '#2E1065' },
          },
          purple: {
            50: { value: '#FAF7FD' },
            100: { value: '#F3EDFA' },
            200: { value: '#E9DEF6' },
            300: { value: '#D8C3EF' },
            400: { value: '#C19CE4' },
            500: { value: '#A876D6' },
            600: { value: '#965EC7' },
            700: { value: '#7D45AB' },
            800: { value: '#693C8D' },
            900: { value: '#563271' },
            950: { value: '#391A51' },
          },
          fuchsia: {
            50: { value: '#FDF4FF' },
            100: { value: '#FAE8FF' },
            200: { value: '#F5D0FE' },
            300: { value: '#F0ABFC' },
            400: { value: '#E879F9' },
            500: { value: '#D946EF' },
            600: { value: '#C026D3' },
            700: { value: '#A21CAF' },
            800: { value: '#86198F' },
            900: { value: '#701A75' },
            950: { value: '#4A044E' },
          },
          pink: {
            50: { value: '#FDF2F8' },
            100: { value: '#FCE7F3' },
            200: { value: '#FBCFE8' },
            300: { value: '#F9A8D4' },
            400: { value: '#F472B6' },
            500: { value: '#EC4899' },
            600: { value: '#DB2777' },
            700: { value: '#BE185D' },
            800: { value: '#9D174D' },
            900: { value: '#831843' },
            950: { value: '#500724' },
          },
          rose: {
            50: { value: '#FFF1F2' },
            100: { value: '#FFE4E6' },
            200: { value: '#FECDD3' },
            300: { value: '#FDA4AF' },
            400: { value: '#FB7185' },
            500: { value: '#F43F5E' },
            600: { value: '#E11D48' },
            700: { value: '#BE123C' },
            800: { value: '#9F1239' },
            900: { value: '#881337' },
            950: { value: '#4C0519' },
          },
        },
        shadows: {
          normal: {
            value:
              '0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.12)',
          },
          emphasize: {
            value:
              '0px 0px 1px rgba(0, 0, 0, 0.08), 0px 1px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.12)',
          },
          strong: {
            value:
              '0px 0px 4px rgba(0, 0, 0, 0.08), 0px 4px 8px rgba(0, 0, 0, 0.08), 0px 6px 12px rgba(0, 0, 0, 0.12)',
          },
          heavy: {
            value:
              '0px 0px 8px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.08), 0px 16px 20px rgba(0, 0, 0, 0.12)',
          },
        },
        fonts: {
          pretendard: { value: 'var(--font-pretendard), sans-serif' },
          yeoljeong: { value: 'var(--font-yeoljeong), sans-serif' },
        },
      },
      semanticTokens: {
        colors: {
          primary: {
            normal: { value: '{colors.lime.300}' },
            strong: { value: '{colors.lime.400}' },
            heavy: { value: '{colors.lime.500}' },
          },
          secondary: {
            normal: { value: '{colors.purple.600}' },
            strong: { value: '{colors.purple.700}' },
            heavy: { value: '{colors.purple.800}' },
          },
          label: {
            normal: { value: '{colors.stone.950}' },
            strong: { value: '{colors.common.0}' },
            neutral: { value: 'rgba(41, 37, 36, 0.88)' },
            alternative: { value: 'rgba(68, 64, 60, 0.61)' },
            assistive: { value: 'rgba(68, 64, 60, 0.28)' },
            disable: { value: 'rgba(68, 64, 60, 0.16)' },
          },
          background: {
            normal: {
              normal: { value: '{colors.stone.50}' },
              alternative: { value: '{colors.stone.100}' },
            },
            elevated: {
              normal: { value: '{colors.common.100}' },
              alternative: { value: '{colors.stone.50}' },
            },
          },
          interaction: {
            inactive: { value: '{colors.stone.400}' },
            disable: { value: '{colors.stone.100}' },
          },
          line: {
            normal: { value: 'rgba(115, 115, 115, 0.22)' },
            neutral: { value: 'rgba(115, 115, 115, 0.16)' },
            alternative: { value: 'rgba(115, 115, 115, 0.08)' },
          },
          status: {
            positive: { value: '{colors.green.500}' },
            cautionary: { value: '{colors.amber.500}' },
            negative: { value: '{colors.red.500}' },
          },
          accent: {
            orange: { value: '{colors.orange.500}' },
            yellow: { value: '{colors.yellow.400}' },
            lime: { value: '{colors.lime.400}' },
            emerald: { value: '{colors.emerald.400}' },
            cyan: { value: '{colors.cyan.400}' },
            sky: { value: '{colors.sky.400}' },
            violet: { value: '{colors.violet.500}' },
            purple: { value: '{colors.purple.500}' },
            pink: { value: '{colors.pink.400}' },
            rose: { value: '{colors.rose.400}' },
          },
          static: {
            white: { value: '{colors.common.100}' },
            black: { value: '{colors.common.0}' },
          },
          fill: {
            normal: { value: 'rgba(120, 113, 108, 0.08)' },
            strong: { value: 'rgba(120, 113, 108, 0.16)' },
            alternative: { value: 'rgba(120, 113, 108, 0.05)' },
          },
          material: {
            dimmer: { value: 'rgba(28, 25, 23, 0.52)' },
          },
        },
      },
      textStyles: {
        hero1: {
          regular: {
            value: {
              fontFamily: '{fonts.yeoljeong}',
              fontWeight: '400',
              fontSize: '3.5rem',
              lineHeight: '4.5rem',
              letterSpacing: '-0.0319em',
            },
          },
          medium: {
            value: {
              fontFamily: '{fonts.yeoljeong}',
              fontWeight: '500',
              fontSize: '3.5rem',
              lineHeight: '4.5rem',
              letterSpacing: '-0.0319em',
            },
          },
          bold: {
            value: {
              fontFamily: '{fonts.yeoljeong}',
              fontWeight: '600',
              fontSize: '3.5rem',
              lineHeight: '4.5rem',
              letterSpacing: '-0.0319em',
            },
          },
        },
        display1: {
          regular: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '400',
              fontSize: '3.5rem',
              lineHeight: '4.5rem',
              letterSpacing: '-0.0319em',
            },
          },
          medium: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '500',
              fontSize: '3.5rem',
              lineHeight: '4.5rem',
              letterSpacing: '-0.0319em',
            },
          },
          bold: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '700',
              fontSize: '3.5rem',
              lineHeight: '4.5rem',
              letterSpacing: '-0.0319em',
            },
          },
        },
        display2: {
          regular: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '400',
              fontSize: '2.5rem',
              lineHeight: '3.25rem',
              letterSpacing: '-0.0282em',
            },
          },
          medium: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '500',
              fontSize: '2.5rem',
              lineHeight: '3.25rem',
              letterSpacing: '-0.0282em',
            },
          },
          bold: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '700',
              fontSize: '2.5rem',
              lineHeight: '3.25rem',
              letterSpacing: '-0.0282em',
            },
          },
        },
        title1: {
          regular: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '400',
              fontSize: '2.25rem',
              lineHeight: '3rem',
              letterSpacing: '-0.027em',
            },
          },
          medium: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '500',
              fontSize: '2.25rem',
              lineHeight: '3rem',
              letterSpacing: '-0.027em',
            },
          },
          bold: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '700',
              fontSize: '2.25rem',
              lineHeight: '3rem',
              letterSpacing: '-0.027em',
            },
          },
        },
        title2: {
          regular: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '400',
              fontSize: '1.75rem',
              lineHeight: '2.375rem',
              letterSpacing: '-0.0236em',
            },
          },
          medium: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '500',
              fontSize: '1.75rem',
              lineHeight: '2.375rem',
              letterSpacing: '-0.0236em',
            },
          },
          bold: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '700',
              fontSize: '1.75rem',
              lineHeight: '2.375rem',
              letterSpacing: '-0.0236em',
            },
          },
        },
        title3: {
          regular: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '400',
              fontSize: '1.5rem',
              lineHeight: '2rem',
              letterSpacing: '-0.023em',
            },
          },
          medium: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '500',
              fontSize: '1.5rem',
              lineHeight: '2rem',
              letterSpacing: '-0.023em',
            },
          },
          bold: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '700',
              fontSize: '1.5rem',
              lineHeight: '2rem',
              letterSpacing: '-0.023em',
            },
          },
        },
        heading1: {
          regular: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '400',
              fontSize: '1.375rem',
              lineHeight: '1.875rem',
              letterSpacing: '-0.0194em',
            },
          },
          medium: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '500',
              fontSize: '1.375rem',
              lineHeight: '1.875rem',
              letterSpacing: '-0.0194em',
            },
          },
          bold: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '600',
              fontSize: '1.375rem',
              lineHeight: '1.875rem',
              letterSpacing: '-0.0194em',
            },
          },
        },
        heading2: {
          regular: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '400',
              fontSize: '1.25rem',
              lineHeight: '1.75rem',
              letterSpacing: '-0.012em',
            },
          },
          medium: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '500',
              fontSize: '1.25rem',
              lineHeight: '1.75rem',
              letterSpacing: '-0.012em',
            },
          },
          bold: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '600',
              fontSize: '1.25rem',
              lineHeight: '1.75rem',
              letterSpacing: '-0.012em',
            },
          },
        },
        headline1: {
          regular: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '400',
              fontSize: '1.125rem',
              lineHeight: '1.625rem',
              letterSpacing: '-0.002em',
            },
          },
          medium: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '500',
              fontSize: '1.125rem',
              lineHeight: '1.625rem',
              letterSpacing: '-0.002em',
            },
          },
          bold: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '600',
              fontSize: '1.125rem',
              lineHeight: '1.625rem',
              letterSpacing: '-0.002em',
            },
          },
        },
        headline2: {
          regular: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '400',
              fontSize: '1.0625rem',
              lineHeight: '1.412rem',
              letterSpacing: '0em',
            },
          },
          medium: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '500',
              fontSize: '1.0625rem',
              lineHeight: '1.412rem',
              letterSpacing: '0em',
            },
          },
          bold: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '600',
              fontSize: '1.0625rem',
              lineHeight: '1.412rem',
              letterSpacing: '0em',
            },
          },
        },
        body1: {
          normal: {
            regular: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '400',
                fontSize: '1rem',
                lineHeight: '1.5rem',
                letterSpacing: '0.0057em',
              },
            },
            medium: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '500',
                fontSize: '1rem',
                lineHeight: '1.5rem',
                letterSpacing: '0.0057em',
              },
            },
            bold: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '600',
                fontSize: '1rem',
                lineHeight: '1.5rem',
                letterSpacing: '0.0057em',
              },
            },
          },
          reading: {
            regular: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '400',
                fontSize: '1rem',
                lineHeight: '1.625rem',
                letterSpacing: '0.0057em',
              },
            },
            medium: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '500',
                fontSize: '1rem',
                lineHeight: '1.625rem',
                letterSpacing: '0.0057em',
              },
            },
            bold: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '600',
                fontSize: '1rem',
                lineHeight: '1.625rem',
                letterSpacing: '0.0057em',
              },
            },
          },
        },
        body2: {
          normal: {
            regular: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '400',
                fontSize: '0.938rem',
                lineHeight: '1.467rem',
                letterSpacing: '0.0096em',
              },
            },
            medium: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '500',
                fontSize: '0.938rem',
                lineHeight: '1.467rem',
                letterSpacing: '0.0096em',
              },
            },
            bold: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '600',
                fontSize: '0.938rem',
                lineHeight: '1.467rem',
                letterSpacing: '0.0096em',
              },
            },
          },
          reading: {
            regular: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '400',
                fontSize: '0.938rem',
                lineHeight: '1.6rem',
                letterSpacing: '0.0096em',
              },
            },
            medium: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '500',
                fontSize: '0.938rem',
                lineHeight: '1.6rem',
                letterSpacing: '0.0096em',
              },
            },
            bold: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '600',
                fontSize: '0.938rem',
                lineHeight: '1.6rem',
                letterSpacing: '0.0096em',
              },
            },
          },
        },
        label1: {
          normal: {
            regular: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '400',
                fontSize: '0.875rem',
                lineHeight: '1.429rem',
                letterSpacing: '0.0145em',
              },
            },
            medium: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '500',
                fontSize: '0.875rem',
                lineHeight: '1.429rem',
                letterSpacing: '0.0145em',
              },
            },
            bold: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '600',
                fontSize: '0.875rem',
                lineHeight: '1.429rem',
                letterSpacing: '0.0145em',
              },
            },
          },
          reading: {
            regular: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '400',
                fontSize: '0.875rem',
                lineHeight: '1.571rem',
                letterSpacing: '0.0145em',
              },
            },
            medium: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '500',
                fontSize: '0.875rem',
                lineHeight: '1.571rem',
                letterSpacing: '0.0145em',
              },
            },
            bold: {
              value: {
                fontFamily: '{fonts.pretendard}',
                fontWeight: '600',
                fontSize: '0.875rem',
                lineHeight: '1.571rem',
                letterSpacing: '0.0145em',
              },
            },
          },
        },
        label2: {
          regular: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '400',
              fontSize: '0.8125rem',
              lineHeight: '1.385rem',
              letterSpacing: '0.0194em',
            },
          },
          medium: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '500',
              fontSize: '0.8125rem',
              lineHeight: '1.385rem',
              letterSpacing: '0.0194em',
            },
          },
          bold: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '600',
              fontSize: '0.8125rem',
              lineHeight: '1.385rem',
              letterSpacing: '0.0194em',
            },
          },
        },
        caption1: {
          regular: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '400',
              fontSize: '0.75rem',
              lineHeight: '1.334rem',
              letterSpacing: '0.0252em',
            },
          },
          medium: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '500',
              fontSize: '0.75rem',
              lineHeight: '1.334rem',
              letterSpacing: '0.0252em',
            },
          },
          bold: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '600',
              fontSize: '0.75rem',
              lineHeight: '1.334rem',
              letterSpacing: '0.0252em',
            },
          },
        },
        caption2: {
          regular: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '400',
              fontSize: '0.6875rem',
              lineHeight: '1.273rem',
              letterSpacing: '0.0311em',
            },
          },
          medium: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '500',
              fontSize: '0.6875rem',
              lineHeight: '1.273rem',
              letterSpacing: '0.0311em',
            },
          },
          bold: {
            value: {
              fontFamily: '{fonts.pretendard}',
              fontWeight: '600',
              fontSize: '0.6875rem',
              lineHeight: '1.273rem',
              letterSpacing: '0.0311em',
            },
          },
        },
      },
    },
  },

  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',
});
