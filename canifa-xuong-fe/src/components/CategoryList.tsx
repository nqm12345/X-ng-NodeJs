import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Category } from "../interfaces/Category";
import instance from "../api";
import {
  CategoryContext,
  CategoryContextType,
} from "../contexts/CategoryContext";
import { Button, Popconfirm } from "antd";

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/categories`);
      setCategories(data.data);
    })();
  }, []);

  const { state, removeCategory } = useContext(
    CategoryContext
  ) as CategoryContextType;

  return (
    <div>
      <h1>Hello Admin</h1>
      <Link to="/admin/category-add" className="btn btn-primary">
        Them danh muc moi
      </Link>
      <table className="table table-bodered table-striped text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tittle</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.categories.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <Link
                  to={`/admin/category-edit/${item._id}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                <Popconfirm
                  title="Xóa danh mục"
                  description="Bạn muốn danh mục này chứ?"
                  onConfirm={() => removeCategory(item._id!)}
                  //   onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
