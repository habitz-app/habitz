import axios from '@/apis/axios';
import { PointAmountResponse } from '@/types/api/response';
import { useQuery } from '@tanstack/react-query';

const usePoint = () =>
  useQuery<number>({
    queryKey: ['me', 'point'],
    queryFn: async () => {
      const res = await axios.get<PointAmountResponse>('/point/amount');
      return res.data.data.point ?? 0;
    },
    staleTime: 0,
  });

export default usePoint;
