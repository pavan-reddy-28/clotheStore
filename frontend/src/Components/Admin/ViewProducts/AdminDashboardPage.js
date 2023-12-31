import React, { useEffect } from 'react'
import styled from 'styled-components'
import { getAllProductsWithImages } from '../../../features/product/adminProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ProductCard from './ProductCard';
import { MainNav } from '../styles/styles';
import HeaderTextComponent from '../../Login/HeaderTextComponent';
import { useNavigate } from 'react-router-dom';



function ViewProductsPageAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsData = useSelector(state => state.adminProducts['productsWithImages'])
  const addProduct = ()=>{
    navigate('/adminAddProduct');
  }
  useEffect(() => {
    dispatch(getAllProductsWithImages());
  }, [])

  return (

    <MainNav>
      <HeaderTextComponent title={'Dasboard'}/>
      <Fab onClick={()=>addProduct()} color="primary" aria-label="add" variant="extended" >
        <AddIcon  sx={{ mr: 1 }} />
        Add Product
      </Fab>

      <>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '1300px', justifyContent: 'space-between' }}>

          {
            productsData &&
            Object.values(productsData).map((obj, index) => {
              const sizesArray = Object.entries(obj.sizes).map(([size, quantity]) => ({ size, quantity }));
              return (
                <ProductCard productData={{
                  'productId': obj._id,
                  'price': obj.price,
                  'brand': obj.brand,
                  'color': obj.color,
                  'title': obj.title,
                  'description': obj.description,
                  'imageData': obj.image,
                  'sizesArray': sizesArray
                }}
                />

              )
            })
          }
        </div>
      </>

    </MainNav>
  )
}

export default ViewProductsPageAdmin