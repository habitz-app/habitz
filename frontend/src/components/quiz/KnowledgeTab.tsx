import * as Tabs from '@/components/ui/tabs';
import { css } from 'styled-system/css';
import KnowledgeItem from './KnowledgeItem';

const options = [
  {
    id: '1',
    label: '생활/습관',
    items: [
      {
        title: '소화기는 어떻게 사용할까요?',
        contents:
          '건조한 봄 날씨에는 불이 나기 쉬워요. 화재가 발생하고 5분이 지나면 불길이 번지는 속도가 급격하게 빨라져요.',
      },
      {
        title: '소화기는 어떻게 사용할까요?',
        contents:
          '건조한 봄 날씨에는 불이 나기 쉬워요. 화재가 발생하고 5분이 지나면 불길이 번지는 속도가 급격하게 빨라져요.',
      },
    ],
  },
  {
    id: '2',
    label: '금융/재테크',
    items: [
      {
        title: '소화기는 어떻게 사용할까요?',
        contents:
          '건조한 봄 날씨에는 불이 나기 쉬워요. 화재가 발생하고 5분이 지나면 불길이 번지는 속도가 급격하게 빨라져요.',
      },
    ],
  },
  {
    id: '3',
    label: '기초상식',
    items: [
      {
        title: '소화기는 어떻게 사용할까요?',
        contents:
          '건조한 봄 날씨에는 불이 나기 쉬워요. 화재가 발생하고 5분이 지나면 불길이 번지는 속도가 급격하게 빨라져요.',
      },
      {
        title: '소화기는 어떻게 사용할까요?',
        contents:
          '건조한 봄 날씨에는 불이 나기 쉬워요. 화재가 발생하고 5분이 지나면 불길이 번지는 속도가 급격하게 빨라져요.',
      },
    ],
  },
];
const KnowledgeTab = () => {
  return (
    <section
      className={css({
        p: '0.625rem',
        display: 'flex',
        flexDir: 'column',
        gap: '0.625rem',
      })}
    >
      <span
        className={css({
          display: 'flex',
          justifyContent: 'flex-start',
        })}
      >
        <p
          className={css({
            textStyle: 'headline2.bold',
            wordWrap: 'break-word',
          })}
        >
          읽으면 똑똑해지는 어린이 지식
        </p>
      </span>
      <Tabs.Root
        defaultValue="1"
        variant="enclosed"
        size="lg"
        width={'full'}
        display={'flex'}
      >
        <Tabs.List display={'flex'} w={'full'} justifyContent={'space-between'}>
          {options.map((option) => (
            <Tabs.Trigger
              key={option.id}
              value={option.id}
              textStyle="caption1.bold"
            >
              {option.label}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content
          value="1"
          px={0}
          display={'flex'}
          flexDir={'column'}
          gap={'0.625rem'}
        >
          {options[0].items?.map((item, index) => (
            <KnowledgeItem
              key={index}
              title={item.title}
              contents={item.contents}
            />
          ))}
        </Tabs.Content>
        <Tabs.Content
          value="2"
          px={0}
          display={'flex'}
          flexDir={'column'}
          gap={'0.625rem'}
        >
          {options[1].items?.map((item, index) => (
            <KnowledgeItem
              key={index}
              title={item.title}
              contents={item.contents}
            />
          ))}
        </Tabs.Content>
        <Tabs.Content
          value="3"
          px={0}
          display={'flex'}
          flexDir={'column'}
          gap={'0.625rem'}
        >
          {options[2].items?.map((item, index) => (
            <KnowledgeItem
              key={index}
              title={item.title}
              contents={item.contents}
            />
          ))}
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
};

export default KnowledgeTab;
