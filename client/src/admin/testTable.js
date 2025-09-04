import styles from "./testTable.module.css";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TestTable({ data }) {
  const [productData, setProductData] = useState(data);
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setProductData(data);
    setFilteredProducts(data);
  }, [data]);

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "rgba(255, 140, 58, 1);",
          opacity: 1,
          border: 0,
          ...theme.applyStyles("dark", {
            backgroundColor: "rgba(255, 140, 58, 1);",
          }),
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "rgba(255, 140, 58, 1);",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[100],
        ...theme.applyStyles("dark", {
          color: theme.palette.grey[600],
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.7,
        ...theme.applyStyles("dark", {
          opacity: 0.3,
        }),
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
      ...theme.applyStyles("dark", {
        backgroundColor: "#39393D",
      }),
    },
  }));

  async function changeStatus(productId) {
    setProductData((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, isActive: !item.isActive } : item
      )
    );
    await fetch(`http://localhost:3030/products/status/${productId}`, {
      method: "POST",
    });
  }

  async function deleteProduct(productId) {
    setProductData((prev) =>
      prev.filter((product) => product._id !== productId)
    );
    const deletedProct = await fetch(
      `http://localhost:3030/products/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    return deletedProct;
  }

  function searchOnChange(e) {
    const value = e.target.value;
    setSearchData(value);

    const filteredProdutcs = productData.filter(
      (product) =>
        product["name"].toLowerCase().includes(value.toLowerCase()) ||
        product["origin"].toLowerCase().includes(value.toLowerCase()) ||
        product["roastLevel"].toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filteredProdutcs);
  }

  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableData}>
        <h1 className={styles.tableDataName}>Products</h1>
        <div className={styles.tableDataActions}>
          <div className={styles.tableDataSearchContainer}>
            <img
              className={styles.tableDataSearchIcon}
              src="/magnifying-glass-solid-full.svg"
              alt="searchIcon"
            />
            <input
              onChange={(e) => searchOnChange(e)}
              className={styles.tableDataSearchInput}
              value={searchData}
              type="text"
              name="search"
              placeholder="Search products..."
            />
          </div>
          <button
            onClick={() => navigate("/admin/create")}
            className={styles.tableDataSearchButton}
          >
            + Add Product
          </button>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeadersWrapper}>
            <th className={styles.tableHeader}>PRODUCT NAME</th>
            <th className={styles.tableHeader}>PRICE</th>
            <th className={styles.tableHeader}>ROAST LEVEL</th>
            <th className={styles.tableHeader}>ORIGIN</th>
            <th className={styles.tableHeader}>STOCK QUANTITY</th>
            <th className={styles.tableHeader}>IS ACTIVE</th>
            <th className={styles.tableHeader}>TIMES BOUGHT</th>
            <th className={styles.tableHeader}>ACTIONS</th>
          </tr>
        </thead>
        <tbody className={styles.tableBodysWrapper}>
          {filteredProducts.map((product) => (
            <tr className={styles.tableBodyWrap} key={product._id}>
              <td className={`${styles.tableBody} ${styles.tableBodyDarker}`}>
                {product.name}
              </td>
              <td className={styles.tableBody}>${product.price}</td>
              <td className={styles.tableBody}>{product.roastLevel}</td>
              <td className={styles.tableBody}>{product.origin}</td>
              <td className={styles.tableBody}>{product.qty}</td>
              <td className={styles.tableBody}>
                <FormControlLabel
                  control={
                    <IOSSwitch sx={{ m: 1 }} checked={product.isActive} />
                  }
                  onClick={() => changeStatus(product._id)}
                />
              </td>
              <td className={styles.tableBody}>{product.bought}</td>
              <td className={`${styles.tableBody} ${styles.tableActions}`}>
                <img
                  className={styles.actionIcon}
                  src="/pen-solid-full.svg"
                  alt="editIcon"
                  onClick={() => navigate(`/admin/edit/${product._id}`)}
                />
                <img
                  className={styles.actionIcon}
                  onClick={() => deleteProduct(product._id)}
                  src="/trash-solid-full.svg"
                  alt="deleteIcon"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
