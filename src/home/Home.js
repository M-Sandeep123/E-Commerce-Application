import * as React from 'react';
import { FormControl,Select,MenuItem,InputLabel } from '@mui/material';
import { Box } from '@mui/system';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ProductCards from '../components/Products/product';
//import products from "../DemoData/productsData"
import "./home.css";
import { getAllProductsAPI, getCategoriesAPI } from '../serverAPIs/productAPIs/productsData';


export default function Home({userLoginDetails, searchProduct}) {
  const [selectCategory, setCategory] = React.useState("ALL");
  const [sortData,setSortData] = React.useState("ALL");

  const [productData,setProductData] = React.useState([]);
  const [productCategories,setproductCategories] = React.useState([]);

  const handleChange = (event, newAlignment) => {
    setCategory(newAlignment);
  };

  const onSelectChange = (event)=>{
    setSortData(event.target.value);
  }

  React.useEffect(()=>{
    getAllProductsAPI().then((data)=>{
      setProductData([...data]);
    })
  },[]);

  React.useEffect(()=>{
    getCategoriesAPI().then((data)=>{
      setproductCategories([...data]);
    })
  },[]);

  return (
    <div>
      <Box  className='category-group'>
      <ToggleButtonGroup
        // style={{ marginLeft: "500px", padding: "10px" }}
        color="primary"
        value={selectCategory}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="ALL">ALL</ToggleButton>
        {productCategories.map((category,index)=>{
          return <ToggleButton key={index} value={category}>{category}</ToggleButton>
        })}
      </ToggleButtonGroup>
      </Box>
      <Box sx={{margin : 1}}>
        <FormControl className="selection-items">
          <InputLabel id="ticket-status-select-label" variant="outlined">Select...</InputLabel>
          <Select
            labelId="select-item-label"
            id="select-item-label"
            value={sortData}
            label="Age"
            onChange={onSelectChange}
          >
            <MenuItem value="ALL">All</MenuItem>
            <MenuItem value="DESC">Price : High to Low</MenuItem>
            <MenuItem value="ASC">Price : Low to High</MenuItem>
            <MenuItem value="NEW">Newest</MenuItem>
          </Select>
          {/* <Button variant="contained" onClick={handleTicketPopupOpen}>New Ticket</Button> */}
        </FormControl>
      </Box>
      <div className="product-container">
        {searchProduct==="" && selectCategory==="ALL" ?
          sortData==="ALL"? productData.map((product, index) => {
          return <ProductCards userLoginDetails={userLoginDetails} key={index} product={product} />
        }):sortData==="DESC"? productData.sort((a,b)=>b.price-a.price).map((product, index) => {
          return <ProductCards userLoginDetails={userLoginDetails} key={index} product={product} />
        }):sortData==="ASC" ? productData.sort((a,b)=>a.price-b.price).map((product, index) => {
          return <ProductCards key={index} product={product} />
        }) : productData.map((product, index) => {
          return <ProductCards userLoginDetails={userLoginDetails} key={index} product={product} />
        }) : searchProduct==="" && selectCategory!=="ALL" &&
              sortData==="ALL" ? productData.filter((product)=>product.category===selectCategory).map((product,index)=>{
                return <ProductCards userLoginDetails={userLoginDetails} key={index} product={product} />
              }): sortData==="DESC" ? productData.filter((product)=>product.category===selectCategory).sort((a,b)=>b.price-a.price)
              .map((product,index)=>{
                return <ProductCards userLoginDetails={userLoginDetails} key={index} product={product} />
              }): sortData==="ASC"? productData.filter((product)=>product.category===selectCategory).sort((a,b)=>a.price-b.price)
              .map((product,index)=>{
                return <ProductCards userLoginDetails={userLoginDetails} key={index} product={product} />
              }) : productData.filter((product)=>product.category===selectCategory).map((product,index)=>{
                return <ProductCards userLoginDetails={userLoginDetails} key={index} product={product} />
              })
        }
        {searchProduct!=="" && productData.map((product,index)=>{
          if(product.name.toLowerCase().includes(searchProduct.toLowerCase())|| product.category.toLowerCase().includes(searchProduct.toLowerCase())){
            return <ProductCards userLoginDetails={userLoginDetails} key={index} product={product} />
          }
          return <></>;
        })}
      </div>
    </div>
  );
}