export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  description: string;
  mainImage: {
    assets: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
  comments: [Comment];
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _type: string;
    _ref: string;
  };
  _createdAt: string;
  _type: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}
