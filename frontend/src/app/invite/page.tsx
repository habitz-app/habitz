'use client';
import axios from '@/apis/axios';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface FamilyMember {
  memberRole: 'PARENT' | 'CHILD';
  memberId: number;
  name: string;
  uuid: string;
  profileImage: string;
}

const Invite = () => {
  const family = useQuery({
    queryKey: ['family', 'member'],
    queryFn: async () => {
      const res = await axios.get<FamilyMember[]>('/family/memberList');
      console.log(res.data);
      return res.data.data ?? [];
    },
  });

  return (
    <div>
      {family.data &&
        family.data.map((member) => (
          <div key={member.uuid}>
            <Image
              src={member.profileImage}
              alt={member.name}
              width={50}
              height={50}
            />
            <p>{member.name}</p>
            <p>{member.memberRole}</p>
          </div>
        ))}
    </div>
  );
};

export default Invite;
