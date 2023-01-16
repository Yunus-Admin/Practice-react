import React from "react";
import Mybutton from "./UI/button/Mybutton";
//props это входные данные как аргументы
const PostItem = (props) => {
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {props.number + 1}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post__btns">
        <Mybutton onClick={() => props.remove(props.post)}>удалить</Mybutton>
      </div>
    </div>
  );
};

export default PostItem;
