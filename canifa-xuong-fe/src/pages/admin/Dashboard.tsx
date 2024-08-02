import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  ProductContext,
  ProductContextType,
} from "../../contexts/ProductContext";
import { Button, Popconfirm } from "antd";

const Dashboard = () => {
  const { state, removeProduct } = useContext(
    ProductContext
  ) as ProductContextType;

  return (
    <div>
      <h1>Hello Admin</h1>
      <Link to="/admin/product-add" className="btn btn-primary">
        Thêm sản phẩm
      </Link>
      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Image</th>
            <th>New Price</th>
            <th>Old Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.title}</td>
              <td>
                {item.image ? (
                  <img src={item.image} alt={item.title} width={50} />
                ) : (
                  "No image"
                )}
              </td>
              <td>{item.newprice}</td>
              <td>{item.oldprice}</td>
              <td>{item.description}</td>
              <td>
                <Link
                  to={`/admin/product-edit/${item._id}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                <Popconfirm
                  title="Xóa sản phẩm"
                  description="Bạn muốn xóa sản phẩm này chứ?"
                  onConfirm={() => removeProduct(item._id!)}
                  // onCancel={cancel}
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

export default Dashboard;
