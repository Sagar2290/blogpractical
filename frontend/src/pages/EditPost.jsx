import { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const storePost = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (slug) {
      const slugPost = storePost.find((post) => post.slug === slug);
      console.log(slugPost);
      if (slugPost) setPost(slugPost);
      else navigate("/");
    } else navigate("/");

    console.log(slug);
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
