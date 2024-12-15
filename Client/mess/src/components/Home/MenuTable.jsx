import React from "react";
import { Table } from "antd";
import "./MenuTable.css";

const MenuTable = () => {
  const data = [
    {
      day: "Sunday",
      breakfast: { item: "Dosa,Palli Chutney,Milk/Coffee", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPVLUW2rZ86SclKhxPPYMNo6pmsCPBOM0MXx7kWYRUBM0PF7_cn8B7mvfkbtCTR-tVYGw&usqp=CAU" },
      lunch: { item: "Rice, Sambar, Banana, Curd", image: "https://5.imimg.com/data5/SELLER/Default/2022/10/QA/XM/BY/114248466/ready-to-eat-food-dal-rice-500x500.jpg" },
      dinner: { item: "Pulao Rice,Chicken Curry(200gm),", image: "https://traditionallymodernfood.com/wp-content/uploads/2022/03/lunchbox-combo-veg-pulao-brinjal-curry-scaled.jpeg" },
    },
    {
      day: "Monday",
      breakfast: { item: "Idli,Palli Chutney,Milk/Coffee", image: "https://www.foodie-trail.com/wp-content/uploads/2020/06/251fdbc0-57f6-41c3-a976-5192391cf040.jpg" },
      lunch: { item: "Rice, Vegetable Salad, Dal, Rasam, Curd", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMlfN0K0rQbGgQfCYqi2wvj-8ginlWzKSgow&s" },
      dinner: { item: "Rice, Brinjal Curry, Sambar, Banana, Curd", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRaGASvTPMjdv1B4IoVXSudmdd4GfFQp19JA&s" },
    },
    {
      day: "Tuesday",
      breakfast: { item: "Uttapam ,Chutney,Milk/Coffee", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPVLUW2rZ86SclKhxPPYMNo6pmsCPBOM0MXx7kWYRUBM0PF7_cn8B7mvfkbtCTR-tVYGw&usqp=CAU" },
      lunch: { item: "Rice, Potato Curry, Dal, Rasam, Curd", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5uzb0v5wMM3GylOxcfIODZYufEjDwHFDWqodEYAf4FFV7TsFw1Fb1LpU0PTDIdVJSk0&usqp=CAU" },
      dinner: { item: "Rice, Potato Fry, Banana, Curd", image: "https://5.imimg.com/data5/SELLER/Default/2022/10/QA/XM/BY/114248466/ready-to-eat-food-dal-rice-500x500.jpg" },
    },
    {
      day: "Wednesday",
      breakfast: { item: "Vadda, Chutney,Milk/Coffee", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWcIGbXeviVE0rzYGyoOBxBFVJCcIAaaJB-g&s" },
      lunch: { item: "Rice,Brinja Curry, Dal, Rasam, Curd", image: "https://5.imimg.com/data5/SELLER/Default/2022/10/QA/XM/BY/114248466/ready-to-eat-food-dal-rice-500x500.jpg" },
      dinner: { item: "Briyani,Chicken Curry(200gm)", image: "https://traditionallymodernfood.com/wp-content/uploads/2022/03/lunchbox-combo-veg-pulao-brinjal-curry-scaled.jpeg" },
    },
    {
      day: "Thursday",
      breakfast: { item: "Upma, Chutney,Milk/Coffee", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcIpvUoVNe6Tvck4LlfdlddQOd_oStN3kWXg&s" },
      lunch: { item: "Rice, Potato, Dal, Rasam, Curd", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5uzb0v5wMM3GylOxcfIODZYufEjDwHFDWqodEYAf4FFV7TsFw1Fb1LpU0PTDIdVJSk0&usqp=CAU" },
      dinner: { item: "Chappati, Banana, Curd", image: "https://5.imimg.com/data5/SELLER/Default/2022/10/QA/XM/BY/114248466/ready-to-eat-food-dal-rice-500x500.jpg" },
    },
    {
      day: "Friday",
      breakfast: { item: "Idli, Chutney,Milk/Coffee", image: "https://www.foodie-trail.com/wp-content/uploads/2020/06/251fdbc0-57f6-41c3-a976-5192391cf040.jpg" },
      lunch: { item: "Rice, Lady finger, Dal, Rasam, Curd", image: "https://5.imimg.com/data5/SELLER/Default/2022/10/QA/XM/BY/114248466/ready-to-eat-food-dal-rice-500x500.jpg" },
      dinner: { item: "Rice, Egg curry, curd", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRaGASvTPMjdv1B4IoVXSudmdd4GfFQp19JA&s" },
    },
    {
      day: "Saturday",
      breakfast: { item: "Mysore Bajji, Chutney,Milk/Coffee", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWcIGbXeviVE0rzYGyoOBxBFVJCcIAaaJB-g&s" },
      lunch: { item: "Rice,Sambar,Banana, Curd", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5uzb0v5wMM3GylOxcfIODZYufEjDwHFDWqodEYAf4FFV7TsFw1Fb1LpU0PTDIdVJSk0&usqp=CAU" },
      dinner: { item: "Jeera Rice, sambar,curd, banana", image: "https://5.imimg.com/data5/SELLER/Default/2022/10/QA/XM/BY/114248466/ready-to-eat-food-dal-rice-500x500.jpg" },
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