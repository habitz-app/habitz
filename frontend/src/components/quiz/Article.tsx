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
          })}
        >
          바야흐로 딸기의 계절이에요. 딸기는 새콤달콤한 맛 덕분에 케이크, 잼,
          빙수 등 맛있는 디저트에 빠지지 않고 들어가는 재료지요. 그러나 이런
          딸기가 과일이 아니라 채소라는 사실, 알고 있나요?
        </p>
      </div>
      <div className={css({ display: 'flex', flexDir: 'column' })}>
        <span
          className={css({
            textStyle: 'headline2.bold',
            color: 'label.strong',
          })}
        >
          과일과 채소의 차이
        </span>
        <p
          className={css({
            textStyle: 'body2.reading.regular',
            color: 'label.neutral',
          })}
        >
          과일은 나무에서 나는 여러해살이 식물의 열매를 뜻해요. 사과나 배, 감,
          복숭아와 같은 열매가 과일에 속하지요. <br /> 반면에 채소는 한해살이
          식물의 열매로, 나무에서 열리지 않아요. 딸기와 수박, 참외, 멜론 등
          밭에서 캐는 열매들은 과채류에 속한답니다. 토마토와 가지, 오이, 고추,
          호박도 과채류에 속해요.
          <br />
          <br />
          딸기는 겉모습 때문에 특히 과일이라는 오해를 받는데요, 딸기 겉면에
          촘촘하게 박힌 깨알 같은 것들이 사실 씨가 아니라 열매라는 사실, 알고
          있었나요? 우리가 먹는 딸 과육은 줄기 끝에 있는 꽃밭침 부분이 비대해진
          것이래요. 이처럼 씨가 있는 부분이 아닌 다른 부위가 발달해 과육 역할을
          하는 열매를 헛열매라고 불러요.
        </p>
      </div>
    </article>
  );
};

export default Article;
