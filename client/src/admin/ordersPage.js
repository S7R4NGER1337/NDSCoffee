import DataTable from "../components/dataTable";
import Nav from "../components/nav";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState();
  const linkings = [
    {
      linkPath: "/",
      linkName: "Go back to the App",
    },
    {
      linkPath: "/admin",
      linkName: "Admin",
    },
    {
      linkPath: "/admin/create",
      linkName: "Create product",
    },
    {
      linkPath: "/admin/orders",
      linkName: "Orders",
    },
  ];

  useEffect(() => {
    async function getOrders() {
      const response = await fetch("http://localhost:3030/products/order/s");
      const data = await response.json();

      setOrders(data);
    }

    getOrders();
  }, []);

  return (
    <>
      <Nav navName="Admin Panel" navLinks={linkings} />

      <div style={{ margin: "1rem", "marginTop": "5rem" }}>
        <h1>All orders</h1>
          <DataTable data={orders} />
      </div>
    </>
  );
}
