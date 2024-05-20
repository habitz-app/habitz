import { ChildListResponse } from '@/types/api/response';
import { css } from 'styled-system/css';
import { Avatar } from '@/components/ui/avatar';
import { HStack } from 'styled-system/jsx';
import { useEffect, useState } from 'react';

const ChildProfileBox = ({
  child,
  selected,
  selectHandler,
}: {
  child: ChildListResponse;
  selected: boolean;
  selectHandler: (val: boolean) => void;
}) => {
  const [boxColor, setBoxColor] = useState('transparent');
  useEffect(() => {
    setBoxColor(selected ? 'lime.300' : 'transparent');
    console.log('box effect', selected);
  }, [selected]);

  return (
    <HStack
      bg={boxColor}
      px="1rem"
      py="0.25rem"
      rounded="2rem"
      className={css({ cursor: 'pointer' })}
      onClick={() => {
        console.log('🎁 box event', selected, 'to', !selected);
        selectHandler(!selected);
      }}
    >
      <Avatar src={child.profileImage} name={child.name} size="lg" />
      <p>{child.name}</p>
    </HStack>
  );
};
export default ChildProfileBox;
