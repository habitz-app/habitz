import * as Tabs from '@/components/ui/tabs';
import { css } from 'styled-system/css';
import KnowledgeItem from './KnowledgeItem';
import type { options } from '@/types/article/index';

const KnowledgeTab = ({ options }: { options: options }) => {
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
        defaultValue="lifeCategory"
        variant="enclosed"
        w="full"
        display="flex"
      >
        <Tabs.List display="flex" w="full" h="2.5rem">
          {options?.map((option) => (
            <Tabs.Trigger
              key={option.id}
              value={option.id}
              w="1/3"
              textStyle="caption1.bold"
            >
              {option.label}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content
          value="lifeCategory"
          px={0}
          display={'flex'}
          flexDir={'column'}
        >
          {options[0]?.items?.map((item, index) => (
            <KnowledgeItem
              key={index}
              title={item.title}
              contents={item.content}
            />
          ))}
        </Tabs.Content>
        <Tabs.Content
          value="financeCategory"
          px={0}
          display={'flex'}
          flexDir={'column'}
        >
          {options[1]?.items?.map((item, index) => (
            <KnowledgeItem
              key={index}
              title={item.title}
              contents={item.content}
            />
          ))}
        </Tabs.Content>
        <Tabs.Content
          value="defaultCategory"
          px={0}
          display={'flex'}
          flexDir={'column'}
        >
          {options[2]?.items?.map((item, index) => (
            <KnowledgeItem
              key={index}
              title={item.title}
              contents={item.content}
            />
          ))}
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
};

export default KnowledgeTab;
