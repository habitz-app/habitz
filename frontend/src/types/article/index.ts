export type ArticleItem = {
  id: number;
  title: string;
  content: string;
};

export type options = [
  {
    id: 'lifeCategory';
    label: string;
    items: ArticleItem[];
  },
  {
    id: 'financeCategory';
    label: string;
    items: ArticleItem[];
  },
  {
    id: 'defaultCategory';
    label: string;
    items: ArticleItem[];
  },
];
