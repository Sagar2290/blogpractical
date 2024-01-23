import { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import postService from "../services/config";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPost() {
  // const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = useSelector((state) => state.posts);


  useEffect(() => {
    if (slug) {
      postService
        .getPost(slug)
        .then((post) => {
          if (post) {
            // setPost(post);
          }
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/");
    }
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
