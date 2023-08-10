// 유저 회원가입 요청 리스트 응답데이터 타입
interface UserApproveList {
  username: string
  email: string
  hireDate: string
}

// 유저 리스트 응답데이터 타입
interface User {
  username: string
  email: string
  hireDate: string
  remainVacation: number
}

// 연차 리스트 응답데이터 타입
interface VacationList {
  username: string;
  email: string;
  reason: string;
  createdAt: string;
  startDate: string;
  endDate: string
}

// 연차 요청 리스트 응답데이터 타입
interface VacationPendingList {
  username: string,
  email: string,
  reason: string,
  createdDate: string,
  createdAt: string,
  startDate: string,
  endDate: string,
  id: number
}

// 당직 리스트 응답데이터 타입
interface DutyList {
  username: string
  email: string
  createdDate: string
  dutyDate: string
}

// 당직 요청 리스트 응답데이터 타입
interface DutyPendingList {
  username : string
  email: string
  createdDate: string
  dutyDate: string
  id: number
}

