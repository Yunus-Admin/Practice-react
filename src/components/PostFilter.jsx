import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({ filter, setFilter }) => {
  return (
    <>
      <MyInput
        value={filter.query} //возвращаем все поля объекта но заменяем для насм нужное
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="Поиск..."
      />

      <MySelect
        value={filter.sort}
        onChange={(selectedPort) =>
          setFilter({ ...filter, sort: selectedPort })
        }
        defaultValue="Сортировка по"
        options={[
          { value: "title", name: "По названию" },
          { value: "body", name: "По описанию" },
        ]}
      />
    </>
  );
};

export default PostFilter;
