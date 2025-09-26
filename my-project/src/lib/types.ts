export type IdeaType = {
  _id: string;
  user_id: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  title: string;
  description: string;
  content: {
    benefits: string;
    conclusion: string;
    description: string;
    works: string;
  };
  attachment: string;
  categories: string[];
  tags: string[];
  visibility: "public" | "private" | "only me";
  createdAt: string;
  updatedAt: string;
  __v: number;
};
