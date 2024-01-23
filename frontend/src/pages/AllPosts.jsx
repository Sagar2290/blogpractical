import { useEffect, useState } from "react";
import postService from "../services/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userToken = useSelector((state) => state.auth.userData.token);

  useEffect(() => {
    console.log(userToken);
    postService
      .getPosts(userToken)
      .then((posts) => {
        if (posts) {
          setPosts(posts.data.posts);
        }
      })
      .catch((err) => console.log(err));
  }, [userToken]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post._id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
