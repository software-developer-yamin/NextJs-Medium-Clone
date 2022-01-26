import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import PortableText from "react-portable-text";
import Comment from "../../components/Comment";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface Props {
  post: Post;
}

const Post = ({ post }: Props) => {
  return (
    <main>
      <Header />
      <img
        className="h-44 w-full object-cover"
        src={urlFor(post.mainImage).url()!}
        alt=""
      />
      <article className="max-w-6xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light mb-2 text-gray-500">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <p className=" font-extralight text-sm">
            Blog post by{" "}
            <span className="text-green-500">{post.author.name}</span> -
            published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            content={post.body}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h1 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:outline-none">
                  {children}
                </a>
              ),
            }}
          />
        </div>
        <hr className="max-w-lg mx-auto border border-yellow-500 my-5" />
      </article>
      <Comment post={post} />
      <div className="p-10 my-10 shadow rounded flex flex-col space-y-2 max-w-2xl mx-auto shadow-yellow-500" >
        <h3 className="text-3xl font-bold" >Comments</h3>
        <hr className="pb-2" />
        {
          post.comments.map((comment) => (
            <div key={comment._id} >
              <p><span className="text-yellow-500 uppercase" >{comment.name} : </span>{comment.comment}</p>
            </div>
          ))
        }
      </div>
    </main>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type=="post"]{
  _id,
  slug {
  current
}
}`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map(({ slug }: Post) => ({
    params: {
      slug: slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=="post" && slug.current == $slug][0]{
  _id,
  _createdAt,
  title,
  description,
  mainImage,
  slug,
  body,
  'comments': *[
    _type=='comment' && post._ref==^._id &&
    approved==true
  ],
  author -> {
  name,
  image
}
}
  `;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: { post },
    revalidate: 60,
  };
};
