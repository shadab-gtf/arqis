import BlogDetailContainer from "@/components/bloglisting/blogDetail/BlogDetailContainer";
import { blogList } from "@/data/blogData";

export default function Page({ params }: { params: { slug: string } }) {
  const data = blogList.find(item => item.slug === params.slug);

  if (!data) {
    return <div>Blog not found</div>;
  }

  return <BlogDetailContainer data={data} />;
}