'use client';
import { HStack } from 'styled-system/jsx';
import { Avatar, AvatarProps } from '@/components/ui/avatar';
import { css } from 'styled-system/css';
const ApprovalProfile = (props: AvatarProps) => {
  return (
    <HStack justify="flex-end">
      <Avatar src={props.src} name={props.name} size="xs"></Avatar>
      <p className={css({ textStyle: 'headline1.bold' })}>{props.name}</p>
    </HStack>
  );
};
export default ApprovalProfile;
