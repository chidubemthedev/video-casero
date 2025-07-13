export type VideoDetails = {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  tags: string | string[];
  visibility: "public" | "private";
  duration?: number | null;
};
