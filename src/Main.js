import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewData } from "./action";

export const Main = () => {
  const [postdata, setData] = useState(true);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const inputRef = useRef("");
  const handleClick = () => {
    dispatch(viewData({ name: inputRef.current.value, completed: false }));
    setData(false);
  };
  useEffect(() => {
    dispatch(viewData());
  }, [dispatch]);
  return (
    <div>
      <div>
        <h3>API Integration Using Redux</h3>
      </div>
      {postdata ? (
        <button onClick={handleClick}>View Data</button>
      ) : (
        <div className="posts">
          {posts.data.map((post, index) => (
            <div>
              <div className="text post" key={index}>
                <ul>
                  <li> {post.id}</li>
                  <li> {post.title}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
