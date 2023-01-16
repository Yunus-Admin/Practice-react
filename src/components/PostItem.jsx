import React from "react";
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
        <button>удалить</button>
      </div>
    </div>
  );
};

export default PostItem;
