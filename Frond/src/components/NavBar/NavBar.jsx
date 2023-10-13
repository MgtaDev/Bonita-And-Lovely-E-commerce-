import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/img/logoBonitaLovelyw.png';
import vector from '../../assets/img/vector.svg'
import { FiChevronDown } from "react-icons/fi";
import { AiFillHeart  , AiOutlineShoppingCart } from 'react-icons/ai';
import {AiFillShopping} from 'react-icons/ai'
import SearchBar from '../SearchBar/SearchBar';
import style from './NavBar.module.css';
import LoginButton from '../LoginComponents/Login';
import Profile from '../LoginComponents/Profile/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux'
import { categories, productFilter, productsCopy } from '../../redux/actions';
import Swal from 'sweetalert2';

const Navbar = ({ initialLanguage }) => {
  const cartApi = useSelector(state => state.apiCart); 
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSub, setIsOpenSub] = useState(false)
  const dispatch = useDispatch()
  const categorias = useSelector((state) => state.Allcategories)
  console.log(categorias)
  const [showMenu, setShowMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [language, setLanguage] = useState(initialLanguage || 'en');
  useEffect(()=>{
    dispatch(categories())
    dispatch(productsCopy())
}, [dispatch])

  const showCategories = () => {
    setIsOpen(true);
  };
  const hideCategories = () => {
    setIsOpen(false);
  };
  const showSube = () => {
    setIsOpenSub(true);
  };
  const hideSub = () => {
    setIsOpenSub(false);
  };
  const navigate = useNavigate()
  const {loginWithRedirect} = useAuth0()

  const filterByCategories = (event) => {
   const categoryToFilter = event.target.textContent
   const categoriaId = event.target.id
   console.log(categoriaId)
   console.log(categoryToFilter)
   switch (categoryToFilter) {
    case 'Maquillaje':
      navigate('/catalogo')
      dispatch(productFilter({categoriaId: [1]}))
       break;
 
     case 'Skincare':
       navigate('/catalogo')
       dispatch(productFilter({categoriaId: [2]}))
       break;
 
     case 'Accesorios':
       navigate('/catalogo')
       dispatch(productFilter({categoriaId: [3]}))
       break;
       
   
    default:
      break;
   }
  }

  const cartUnif = (cart) => {
    const countMap = {};
    cart.forEach((item) => {
        if (item.id !== undefined && item.id !== null && item.color) {
            const itemKey = `${item.id}`;
            if (countMap[itemKey]) {
                countMap[itemKey] += item.amount;
            } else {
                countMap[itemKey] = item.amount;
            }
        }
    });
    const cartUnifRes = Object.keys(countMap).map((itemKey) => {
        const [itemId] = itemKey.split('_');
        return {
            objeto: cart.find((item) => item.id === itemId),
            cantidad: countMap[itemKey],
            color: 1
        };
    });
    return cartUnifRes;
};
  const cartLS = useSelector(state => state.localCart); 
  const cartUnificado = cartUnif(cartLS);


  //Condicionales de logueo

const navigateFavoritos = () => {
  navigate('/favoritos')
}
const navigateCarrito = () => {
  navigate('/carrito/:id')
}

  

  return (
    <>
      <nav className={style.nav}>
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className={style.logo} />
          </Link>

          <div className={style.searchBar}>
            <SearchBar />
          </div>

          <div className={style.icons}>
          <button onClick={navigateCarrito} className={`relative ${style.btnb} rounded-full`}>
          <AiOutlineShoppingCart />
          </button>
            <button  onClick={navigateFavoritos} className={style.btnb}>
              <AiFillHeart />
            </button>
            <div className={style.menuItem}>
              <Profile />
              <LoginButton />
              {isAuthenticated && <p className={style.userName}>{user.name}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center ml-10">
         
          <div className={`${style.categoriesMenu}`}>
            <ul className={`${style.menu} ${showMenu ? style.show : ''}`}>
              <li>
                <NavLink
                  to="/"
                  lang={initialLanguage === 'en' ? 'en' : 'es'}
                  className={`${style.menuItem} ${style.itemHome}`}
                >
                  {initialLanguage === 'en' ? 'Home' : 'Inicio'}
                </NavLink>
              </li>

            

              <li>
                <NavLink
                  to="/contact"
                  lang={initialLanguage === 'en' ? 'en' : 'es'}
                  className={style.menuItem}
                >
                  {initialLanguage === 'en' ? 'Contact Us' : 'Contacto'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/catalogo"
                  lang={initialLanguage === 'en' ? 'en' : 'es'}
                  className={style.menuItem}
                >
                  {initialLanguage === 'en' ? 'Catalogo' : 'Catalogo'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/faqs"
                  lang={initialLanguage === 'en' ? 'en' : 'es'}
                  className={style.menuItem}
                >
                  {initialLanguage === 'en' ? 'FAQs' : 'FAQs'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/devTeam"
                  lang={initialLanguage === 'en' ? 'en' : 'es'}
                  className={style.menuItem}
                >
                  {initialLanguage === 'en' ? 'devTeam' : 'DevTeam'}
                </NavLink>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;