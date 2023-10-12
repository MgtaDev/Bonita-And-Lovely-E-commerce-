import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logoBonitaLovelyw.png';
import Facebook from '../../assets/img/facebook.png';
import Twitter from '../../assets/img/gorjeo.png';
import Gmail from '../../assets/img/gmail.png';

function Footer() {
  const redirigirAlInicio = () => {
    window.scrollTo(0, 0);
  }
  return (
    <div className='bg-white border-t px-20 border-gray-300 py-8'>
      <div className='max-w-screen-xl mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <img src={Logo} className='text-xl w-[150px] font-bold '></img>
          </div>
          <p className='text-sm text-gray-700'>© 2023 Bonita and Lovely. Todos los derechos reservados.</p>
        </div>
        <div className='grid grid-cols-3 gap-8 mt-8'>
          <div className=''>
            <h2 className='text-lg font-bold mb-4'>Productos</h2>
            <ul className='space-y-2'>
              <li onClick={redirigirAlInicio()}>
                <Link to='/' className='text-gray-600 hover:text-gray-900'>Home</Link>
              </li>
              <li onClick={redirigirAlInicio()}>
                <Link to='/catalogo' className='text-gray-600 hover:text-gray-900'>Catalogo</Link>
              </li>
           
            </ul>
          </div>
          <div className=''>
            <h2 className='text-lg font-bold mb-4'>Compañía</h2>
            <ul className='space-y-2'>
              <li onClick={redirigirAlInicio()}>
                <Link to='/aboutUs' className='text-gray-600 hover:text-gray-900'>Sobre nosotros</Link>
              </li>
              <li onClick={redirigirAlInicio()}>
                <Link to='/faqs' className='text-gray-600 hover:text-gray-900'>Preguntas frecuentes</Link>
              </li>
            </ul>
          </div>
          <div className=''>
            <h2 className='text-lg font-bold mb-4'>Contacto</h2>
            <ul className='space-y-2'>
              <li>
                <a href='mailto:info@enmable.com' className='text-gray-600 hover:text-gray-900'>info@bonitaandlovely.com</a>
              </li>
              <li onClick={redirigirAlInicio()}>
                <Link to={'/contact'}>Contactanos</Link>
              </li>
              <li>
                <a href='#' className='text-gray-600 hover:text-gray-900'>+1 (123) 400-9813</a>
              </li>
            </ul>
            <div className='flex mt-4 space-x-4'>
              <a href='#'>
                <img src={Facebook} alt='Facebook' className='h-6' />
              </a>
              <a href='#'>
                <img src={Twitter} alt='Twitter' className='h-6' />
              </a>
              <a href='#'>
                <img src={Gmail} alt='Gmail' className='h-6' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;