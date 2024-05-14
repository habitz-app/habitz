import { HStack } from 'styled-system/jsx';
import { circle } from 'styled-system/patterns';
import Image from 'next/image';

const ProfileIcon = ({ imageUrl, alt }: { imageUrl: string; alt: string }) => {
  return (
    <HStack>
      <div
        className={circle({
          size: '3rem',
          overflow: 'hidden',
          position: 'relative',
          bg: 'neutral.300',
          cursor: 'pointer',
        })}
      >
        <Image src={imageUrl} alt={alt} fill />
      </div>
    </HStack>
  );
};
export default ProfileIcon;
