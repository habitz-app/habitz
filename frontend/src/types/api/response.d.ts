export interface CommonResponse<T> {
  data: T;
  message: string;
  status: string;
}

export interface QuizResponse {
  isSolved: boolean;
  quizInfoDto: {
    id: number;
    content: string;
    createdAt: string;
  };
  quizHistoryInfoDto: {
    chosenAnswer: string;
    createdAt: string;
    correct: boolean;
  };
}

export interface KakaoLoginResponse {
  userId: number;
  name: string;
  nickName: string;
  profileImage: string;
  role: string;
  jwtResponse: {
    accessToken: string;
    accessTokenExpiredIn: string;
    tokenType: string;
  };
}

export interface MemberResponse {
  userId: number;
  profileImage: string;
  name: string;
  nickName: string;
  email: string;
  birthDate: string;
  uuid: string;
  role: string;
}

export interface CalendarResponse {
  month: string;
  calendar: {
    child: { name: string; memberUUID: string };
    days: string[];
  }[];
}

export interface ChildListResponse {
  memberRole: 'CHILD' | 'PARENT';
  memberId: number;
  name: string;
  uuid: string;
  profileImage: string;
  point: number;
}

export interface TestCreateChildResponse {
  userId: number;
  name: string;
  profileImage: string;
  nickName: string;
  role: string;
  jwtTokenDto: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    accessTokenExpiredIn: string;
    refreshTokenExpiredIn: string;
  };
}

export interface FamilyMemberListResponse {}

export interface OrderResponse {
  orderId: string;
  memberUuid: string;
  amount: number;
}

export interface ArticleInfo {
  id: number;
  title: string;
  content: string;
  previewImage: string;
  writerName: string;
  writerImage: string;
  source: string;
  url: string;
  category: string;
  publishDate: string;
}
export interface ArticleResponse {
  lifeCategory: ArticleInfo[];
  financeCategory: ArticleInfo[];
  defaultCategory: ArticleInfo[];
}

export interface QuizResponse {
  isSolved: boolean;
  quizInfo: {
    id: number;
    content: string;
    createdAt: string;
  };
  quizHistoryInfo: {
    articleId: number;
    chosenAnswer: string;
    createdAt: string;
    correct: boolean;
  };
}

export interface Mission {
  missionId: number;
  status: 'EMPTY' | 'PENDING' | 'ACCEPT' | 'DECLINE';
  title: string;
  point: number;
  emoji: string;
  content: string;
  repeat: boolean;
  createdAt: string;
  createdBy: {
    name: string;
    memberUUID: string;
    image: string;
    nickname: string;
  };
}
export interface MissionResponse {
  data: Mission[];
}

export interface MissionDetailResponse {
  schedule: {
    scheduleId: number;
  };
  mission: {
    missionId: number;
    title: string;
    content: string;
    emoji: string;
    status: 'ACCEPT' | 'DECLINE' | 'EMPTY' | 'PENDING';
    point: number;
    repeat: boolean;
    createdAt: string;
    createdBy: {
      name: string;
      memberUUID: string;
      image: string;
      nickname: string;
    };
  };
  recognition: {
    image: string;
    content: string;
    updatedAt: string;
  };
  approval: {
    approver: {
      name: string;
      memberUUID: string;
      image: string;
      nickname: string;
    };
    comment: string;
  };
}

export interface HabitzHistory {
  date: string;
  point: number;
  totalPoint: number;
  content: string;
  nickname: string;
}

export interface HabitzHistoryResponse extends Array<HabitzHistory> {}

export interface BannedProductResponse {
  productId: number;
  productName: string;
  price: number;
  productImage: string;
  description: string;
  category: string;
  brand: string;
}
export interface BannedProductListResponse {
  content: BannedProductResponse[];
  totalPages: number;
  totalElements: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
    offset: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  };
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface PointAmountResponse {
  point: number;
  familyPoint: boolean;
}

export interface PointHistory {
  date: string;
  point: number;
  totalPoint: number;
  content: string;
  nickname: string;
}

export interface PointHistoryResponse {
  data: PointHistory[];
}

export interface MissionApproveResponse {
  status: 'success' | 'error' | 'expired' | 'unauthorized' | 'failure';
  message: string;
  data: string;
}

export interface ChildRecentHistory {
  status: string;
  emoji: string;
  historyInfo: {
    date: string;
    point: number;
    totalPoint: number;
    content: string;
    emoji: string;
    missionId: number;
    productPaymentId: number;
  };
}

export interface ChildRecentHistoryResponse extends Array<ChildRecentHistory> {}

export interface ProductResponse {
  productId: number;
  productName: string;
  price: number;
  productImage: string;
  description: string;
  category: string;
  brand: string;
}

export interface ProductListResponse {
  totalPages: number;
  totalElements: number;
  pageable: {
    paged: boolean;
    unpaged: boolean;
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: ProductResponse[];
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}

export interface ProductBannedChildResponse {
  isBanned: boolean;
  name: string;
  profileImageUrl: string;
  childUuid: string;
}
export interface BanStatusResponse {
  childUuid: string;
  name: string;
  profileImageUrl: string;
  isBanned: boolean;
}

export interface ScheduleResponse {
  scheduleId: number;
  title: string;
  content: string;
  emoji: string;
  child: {
    name: string;
    memberUUID: string;
  };
  startDate: string;
  endDate: string;
  weekDays: boolean[];
  point: number;
}

export interface SchedulePostResponse {
  scheduleId: number;
  missionId?: number;
}

export interface SchedulePutResponse {
  scheduleId: number;
  title: string;
  content: string;
  emoji: string;
  child: {
    name: string;
    memberUUID: string;
    image: string;
    nickname: string;
  };
  startDate: string;
  endDate: string;
  weekDays: boolean[];
  point: number;
}

export interface PurchaseResponse {
  purchaseId: number;
}

export interface PurchaseHistory {
  memberUuid: string;
  purchaseId: number;
  price: number;
  purchaseDate: string;
  totalPoint: number;
  productInfo: ProductResponse;
}

export interface PurchaseHistoryResponse {
  data: PurchaseHistory[];
}
