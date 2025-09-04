import DataTable from "../../components/dataTable";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState();

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

      <div style={{ margin: "1rem", "marginTop": "5rem" }}>
        <h1>All orders</h1>
          <DataTable data={orders} />
      </div>
    </>
  );
}
