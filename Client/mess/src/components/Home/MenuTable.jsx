import React from "react";
import { Table } from "antd";
import "./MenuTable.css";

const MenuTable = () => {
  const data = [
    {
      day: "Sunday",
      breakfast: { item: "Dosa,Palli Chutney,Milk/Coffee", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPVLUW2rZ86SclKhxPPYMNo6pmsCPBOM0MXx7kWYRUBM0PF7_cn8B7mvfkbtCTR-tVYGw&usqp=CAU" },
      lunch: { item: "Rice,Sambar,Banana", image: "https://5.imimg.com/data5/SELLER/Default/2022/10/QA/XM/BY/114248466/ready-to-eat-food-dal-rice-500x500.jpg" },
      dinner: { item: "Pulao Rice,Chicken Curry(200gm),", image: "https://traditionallymodernfood.com/wp-content/uploads/2022/03/lunchbox-combo-veg-pulao-brinjal-curry-scaled.jpeg" },
    },
    {
      day: "Monday",
      breakfast: { item: "Omelette", image: "https://via.placeholder.com/150" },
      lunch: { item: "Vegetable Salad", image: "https://via.placeholder.com/150" },
      dinner: { item: "Pizza", image: "https://via.placeholder.com/150" },
    },
    {
      day: "Tuesday",
      breakfast: { item: "French Toast", image: "https://via.placeholder.com/150" },
      lunch: { item: "Fish Curry", image: "https://via.placeholder.com/150" },
      dinner: { item: "Biryani", image: "https://via.placeholder.com/150" },
    },
    {
      day: "Wednesday",
      breakfast: { item: "Smoothie", image: "https://via.placeholder.com/150" },
      lunch: { item: "Dal Tadka", image: "https://via.placeholder.com/150" },
      dinner: { item: "Chole Bhature", image: "https://via.placeholder.com/150" },
    },
    {
      day: "Thursday",
      breakfast: { item: "Paratha", image: "https://via.placeholder.com/150" },
      lunch: { item: "Paneer Butter Masala", image: "https://via.placeholder.com/150" },
      dinner: { item: "Pasta", image: "https://via.placeholder.com/150" },
    },
    {
      day: "Friday",
      breakfast: { item: "Cereal", image: "https://via.placeholder.com/150" },
      lunch: { item: "Fried Rice", image: "https://via.placeholder.com/150" },
      dinner: { item: "Sandwich", image: "https://via.placeholder.com/150" },
    },
    {
      day: "Saturday",
      breakfast: { item: "Bagels", image: "https://via.placeholder.com/150" },
      lunch: { item: "Chicken Wrap", image: "https://via.placeholder.com/150" },
      dinner: { item: "Sushi", image: "https://via.placeholder.com/150" },
    },
  ];

  const columns = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Breakfast",
      key: "breakfast",
      render: (text, record) => (
        <div>
          <img src={record.breakfast.image} alt={record.breakfast.item} />
          <p>{record.breakfast.item}</p>
        </div>
      ),
    },
    {
      title: "Lunch",
      key: "lunch",
      render: (text, record) => (
        <div>
          <img src={record.lunch.image} alt={record.lunch.item} />
          <p>{record.lunch.item}</p>
        </div>
      ),
    },
    {
      title: "Dinner",
      key: "dinner",
      render: (text, record) => (
        <div>
          <img src={record.dinner.image} alt={record.dinner.item} />
          <p>{record.dinner.item}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="menu-table-container">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        rowKey="day"
        className="menu-table"
      />
    </div>
  );
};

export default MenuTable;
