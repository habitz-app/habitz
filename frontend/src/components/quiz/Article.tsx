import { css } from 'styled-system/css';

const Article = ({
  title,
  date,
  contents,
}: {
  title: string;
  date: string;
  contents: string;
}) => {
  return (
    <article
      className={css({
        display: 'flex',
        flexDir: 'column',
        w: 'full',
        gap: '20px',
      })}
    >
      <div className={css({ display: 'flex', flexDir: 'column', w: 'full' })}>
        <h1
          className={css({
            textStyle: 'headline1.bold',
            color: 'label.strong',
            wordWrap: 'break-word',
          })}
        >
          {title}
        </h1>
        <p
          className={css({
            textStyle: 'caption2.medium',
            color: 'label.alternative',
          })}
        >
          {new Date(date).toLocaleDateString()}
        </p>
      </div>
      <div className={css({ display: 'flex', flexDir: 'column' })}>
        <p
          className={css({
            textStyle: 'body2.reading.regular',
            color: 'label.neutral',
            whiteSpace: 'pre-wrap',
          })}
        >
          {contents}
        </p>
      </div>
    </article>
  );
};

export default Article;
