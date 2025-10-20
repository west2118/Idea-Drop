export type IdeaType = {
  _id: string;
  user_id: {
    _id: string;
    firstName: string;
    lastName: string;
    bio: string;
    position: string;
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

export type CollaborationType = {
  _id: string;
  idea_id: string | { _id: string; title: string };
  owner: string;
  collaborations?: {
    user: string;
    role: "owner" | "collaborator";
    joinedAt: string;
  }[];
  requests?: {
    user: string;
    status: "pending" | "accepted" | "declined";
    requestedAt: string;
  }[];
  lookingFor?: string[];
  notes?: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type UserType = {
  _id: string;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  bio?: string;
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
  skills?: string[];
  interests?: string[];
  __v: number;
};

export type CommentType = {
  _id: string;
  ideaId: string;
  parentId?: string | null;
  text: string;
  replies?: CommentType[];
  [key: string]: any;
};
