import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Input, PostCard } from "../components";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const storePosts = useSelector((state) => state.posts.posts);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    setPosts(storePosts);
  }, [storePosts]);

  const submit = async (data) => {
    console.log(data);
    if (data.search) {
      const searchPost = storePosts.filter((post) => {
        console.log(post.title.toString() !== data.search.toString());
        console.log(post.title.toString());
        console.log(data.search.toString());
        return post.title.includes(data.search.toString());
      });
      setPosts(searchPost);
    } else {
      setPosts(storePosts);
    }
  };

  const sortAsc = () => {
    let sortedPosts = [...posts]
    sortedPosts = sortedPosts.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    setPosts(sortedPosts);
  };

  const sortDesc = () => {
    let sortedPosts = [...posts]
    sortedPosts = sortedPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setPosts(sortedPosts);
  };

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="flex">
              <Input
                placeholder="Search"
                {...register("search", { required: true })}
              />
              <Button type="submit" className="ml-2">
                Search
              </Button>
            </div>
          </form>
          <div className="ml-10">
            <Button onClick={sortAsc} className="ml-2">
              Sort Asc Date
            </Button>
            <Button onClick={sortDesc} className="ml-2">
              Sort Desc Date
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post._id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
