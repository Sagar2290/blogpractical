import { useEffect, useState } from "react";
import postService from "../services/config";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/postSlice";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const userToken = useSelector((state) => state.auth?.userData?.token);
  const dispatch = useDispatch();

  useEffect(() => {
    postService
      .getPosts(userToken)
      .then((posts) => {
        if (posts) {
          dispatch(getPosts(posts.data.posts));
        }
      })
      .catch((err) => console.log(err));
  }, [userToken]);

  if (posts.length === 0 && !authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  if (posts.length === 0 && authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No Posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
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

export default Home;
