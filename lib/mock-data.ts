export interface Folder {
  id: string;
  name: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnailGradient: string;
  folderId: string;
}

export const folders: Folder[] = [
  { id: "dev", name: "개발" },
  { id: "design", name: "디자인" },
  { id: "recipe", name: "레시피" },
  { id: "travel", name: "여행" },
];

export const links: LinkItem[] = [
  {
    id: "1",
    title: "Next.js 공식 문서",
    url: "https://nextjs.org/docs",
    description: "App Router와 서버 컴포넌트 등 Next.js의 최신 기능을 확인하세요.",
    thumbnailGradient: "from-zinc-800 to-zinc-600",
    folderId: "dev",
  },
  {
    id: "2",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com/docs",
    description: "유틸리티 클래스만으로 빠르게 UI를 만드는 방법을 알아보세요.",
    thumbnailGradient: "from-sky-500 to-cyan-400",
    folderId: "dev",
  },
  {
    id: "3",
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "전 세계 디자이너들의 작업물을 구경할 수 있는 커뮤니티.",
    thumbnailGradient: "from-pink-500 to-rose-400",
    folderId: "design",
  },
  {
    id: "4",
    title: "Figma",
    url: "https://figma.com",
    description: "브라우저 기반의 협업형 인터페이스 디자인 툴.",
    thumbnailGradient: "from-purple-500 to-indigo-400",
    folderId: "design",
  },
  {
    id: "5",
    title: "만개의 레시피",
    url: "https://www.10000recipe.com",
    description: "오늘 저녁 뭐 먹지 고민될 때 참고하는 레시피 모음.",
    thumbnailGradient: "from-orange-400 to-amber-300",
    folderId: "recipe",
  },
  {
    id: "6",
    title: "제주 여행 코스 정리",
    url: "https://example.com/jeju-travel",
    description: "3박 4일 제주도 여행 코스와 맛집 리스트.",
    thumbnailGradient: "from-emerald-500 to-teal-400",
    folderId: "travel",
  },
  {
    id: "7",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "웹 표준과 브라우저 API를 찾아볼 때 가장 먼저 보는 문서.",
    thumbnailGradient: "from-blue-500 to-indigo-400",
    folderId: "dev",
  },
];
