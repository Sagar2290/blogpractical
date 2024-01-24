import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../services/config";
import { Button, Container } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../store/postSlice";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData._id : false;
  const storePost = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (slug) {
      const slugPost = storePost.find((post) => post.slug === slug);
      if (slugPost) setPost(slugPost);
      else navigate("/");
    } else navigate("/");
  }, [slug, navigate]);

  const postDelete = () => {
    postService
      .deletePost(post._id, userData.token)
      .then((status) => {
        if (status) {
          dispatch(deletePost(post._id));
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.slug}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={postDelete}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p>created: {new Date(post.createdAt).toISOString().split('T')[0]}, Time: {new Date(post.createdAt).toISOString().split('T')[1].substring(0, 8)}</p>
        </div>
        <h2 className="browser-css">Category: {post.category}</h2>
        <br />
        <div className="browser-css">
          Description: <br />
          {post.description}
        </div>
      </Container>
    </div>
  ) : null;
}
