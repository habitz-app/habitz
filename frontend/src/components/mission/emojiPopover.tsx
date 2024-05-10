import React, { Dispatch } from 'react';
import { Button } from '~/components/ui/button';
import * as Popover from '~/components/ui/popover';
import { Stack } from 'styled-system/jsx';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { css } from 'styled-system/css';

const emojiPopover = ({
  emoji,
  setEmoji,
  ...props
}: {
  emoji: string;
  setEmoji: Dispatch<React.SetStateAction<string>>;
  props?: Popover.RootProps;
}) => {
  return (
    <Popover.Root {...props}>
      <Popover.Trigger asChild>
        <Button bg={'transparent'} fontSize={'1.5rem'} px="0">
          {emoji}
        </Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Stack gap="1">
            <Picker
              data={data}
              locale="ko"
              onEmojiSelect={(e: {
                id: string;
                keywords: string[];
                name: string;
                native: string;
                shortcodes: string;
                unified: string;
              }) => {
                if (setEmoji) {
                  setEmoji(e.native);
                  console.log(e.native);
                }
              }}
              position="absolute"
              className={css({
                position: 'absolute',
                bg: 'red.300',
                zIndex: 2,
              })}
            />
          </Stack>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};
export default emojiPopover;
