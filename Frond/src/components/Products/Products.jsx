import styled from 'styled-components'
import categoriasBg from '../../assets/img/categoriasBg.jpg'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { categories, productFilter } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Maquillaje from '../../assets/img/Maquilajebackground.jpeg'
import Skincare from '../../assets/img/Skincarebackground.jpeg'
import Accesorios from '../../assets/img/Aceesorios background.jpeg'


const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom:5%;
  margin-top:3%;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  display:flex;
  padding:1rem;
  flex-direction:row;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  margin: 1rem;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    
  }
`;
const H1 = styled.h1`
font-weight:600;
margin-left:1%;
font-size:30px;

`
const Img = styled.img`
width: 450px
`

const Products = () => {
  useEffect(()=>{
    dispatch(categories())
  }, [])
  const categorias = useSelector((state) => state.Allcategories)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const redirigirAlInicio = () => {
    window.scrollTo(0, 0);
  }

  const filterByCategories = (event) => {
    const categoryToFilter = event.target.name
    switch (categoryToFilter) {
     case 'maquillaje':
      navigate('/catalogo')
      redirigirAlInicio()
      dispatch(productFilter({categoriaId: [1]}))
       break;
 
     case 'skinCare':
       navigate('/catalogo')
       redirigirAlInicio()
       dispatch(productFilter({categoriaId: [2]}))
       break;
 
     case 'accesorios':
       navigate('/catalogo')
       redirigirAlInicio()
       dispatch(productFilter({categoriaId: [3]}))
       break;
       
    
     default:
       break;
    }
   }

return (
  <><H1>Descubre nuestras categorias</H1><CardContainer>

   <Card>
  <Img src={Maquillaje} alt="img" />
  <h2 className='absolute m-6l text-white text-4xl font-bold' style={{ right: '3.6rem' ,marginTop:'5rem' }}>Maquillaje</h2>
  <button name='maquillaje' onClick={filterByCategories} style={{ backgroundColor: 'rgb(109, 1, 110)', position: 'absolute', bottom: '8rem', right: '5rem' }} class="h-10 px-10 font-semibold rounded-md text-white" type="submit">
    Ver mas
  </button>
</Card>

    <Card>
    <Img src={Skincare} alt="img" />
    <h2 className='absolute mx-6 text-white text-4xl font-bold' style={{ right: '3.6rem' ,marginTop:'5rem' }}>Skincare</h2>
    <button  name='skinCare' onClick={filterByCategories}  style={{ backgroundColor: 'rgb(109, 1, 110)', position: 'absolute', bottom: '8rem', right: '5rem' }} class="absolute h-10 px-10 font-semibold rounded-md  mt-20 ml-10 text-white" type="submit">
            Ver mas
          </button>

  
    </Card>

    <Card>
    <Img src={Accesorios} alt="img" />
    <h2 className='absolute m-6  text-white text-4xl font-bold' style={{ right: '3.6rem' ,marginTop:'7rem' }}>Accesorios</h2>
    <button  name='accesorios' onClick={filterByCategories}   style={{ backgroundColor: 'rgb(109, 1, 110)', position: 'absolute', bottom: '8rem', right: '5rem' }} class="absolute h-10 px-10 font-semibold rounded-md  mt-20 ml-10 text-white" type="submit">
            Ver mas
          </button>

    </Card>

    
  </CardContainer></>
    )
}
export default Products;