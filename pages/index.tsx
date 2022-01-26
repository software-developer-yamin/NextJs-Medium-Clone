import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Posts from "../components/Posts";
import { sanityClient, urlFor } from "../sanity"
import {Post} from "../typings"

interface Props {
  posts:[Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <Posts posts={posts} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = `*[_type=="post"]{
    _id,
    title,
    slug,
    mainImage,
    description,
    author -> {
      name,
      image,
    }
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts
    },
  };
};
