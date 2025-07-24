import * as React from 'react';
import DataTable from '../components/dataTable';
import Nav from '../components/nav';


//TODO Render correct data
export default function OrdersPage() {
  const linkings = [
    {
      linkPath: '/admin/create',
      linkName: 'Create product'
    },
    {
      linkPath: '/admin/orders',
      linkName: 'Orders'
    },
  ]
  return (
    <>
      <Nav navName='Admin Panel' navLinks={linkings} />

      <div style={{ margin: '1rem' }}>
        <h1>All orders</h1>
        <DataTable />
      </div>
    </>
  );
}
