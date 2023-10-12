import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri';
import NavBar from "../../components/NavBar/NavBar";
import Proveedores from '../../components/Proveedores/Proveedores';
import Carousel from '../../components/Carousel/Carousel';
import CarouselMid from '../../components/CarouselMid/Carousel'
import Products from '../../components/Products/Products'
// import Offers from '../../components/offers/offers'
import Footer from '../../components/Footer/Footer';
import ChatBotComponent from '../../components/ChatBot/ChatBot';
import Reviews from '../../components/Reviews/Reviews'
import ChooseUs from '../../components/ChooseUsSection/Choose';
import { useDispatch, useSelector } from 'react-redux';
import { clientes, products } from '../../redux/actions';


const Container = styled.div`
  background-color: ${props => props.darkMode ? '#1a1a1a' : '#ebeaea'};
  color: ${props => props.darkMode ? '#fff' : '#333'};
  padding: 0rem;

`;

const LandingPage = () => {

const stateProducts = useSelector(state => state.Allproducts);
const [pageNumberNx, setPageNumberNx] = useState(0);
const numberSize = 20;
console.log(stateProducts)

const dispatch = useDispatch()
useEffect(
  () => {
    const fetchData = () => {
      const queries = {
        page: pageNumberNx,
        size: numberSize
      };

      dispatch(products(queries));
    };

    fetchData();
  },
  [dispatch, pageNumberNx, numberSize, stateProducts.paginas]
);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en'); 

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getButtonLabel = (buttonLanguage) => {
    if (language === 'es') {
      return buttonLanguage === 'es' ? 'Español' : 'Inglés';
    } else if (language === 'en') {
      return buttonLanguage === 'es' ? 'Spanish' : 'English';
    }
  };


  return (
    <>
        <NavBar />
      <Container darkMode={isDarkMode}>
        <div style={{ height: '500px' }}>
          <CarouselMid />
        </div>
        
        <Proveedores/>
        <Products/>
      

        <div style={{ height: '500px' }}>
        <CarouselMid></CarouselMid>
        </div>

        <>
        <Reviews></Reviews>
        </>
        <>
        <ChooseUs></ChooseUs>
        </>

      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;