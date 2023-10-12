import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { addCartLSToApi, clientes, emptyCartLS } from '../../redux/actions';
import axios from 'axios';
import Swal from 'sweetalert2';


const PagoExitoso = () => {
  const [apicart, setApicart] = useState([]); 
  const { user, isAuthenticated, isLoading } = useAuth0();
  const usuarios = useSelector((state) => state.Allclients);
  const extractNumber = (string) => {
    const match = string?.match(/\d+/); 
    return match ? parseInt(match[0]) : 0; 
    
  }; 
  const clientFound = usuarios?.find(client => client.correo_electronico === user?.email) ;
  const NumUserId =  extractNumber(clientFound?.id) ;
  useEffect(() => {
    if (isAuthenticated) {          
      axios.get(`/carrito/${NumUserId}`)
        .then(response => {
          setApicart(response.data);
        })
        .catch(error => {             
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.response?.data || 'Hubo un error en la solicitud.',
            });
          });
    }else{
        return
    }
  }, [NumUserId, isAuthenticated]);
  const cartLS = useSelector(state => state.localCart); 
  useEffect(() => {
    if (isAuthenticated && cartLS) {
      dispatch(addCartLSToApi({ user: NumUserId, localCart: cartLS }))
        .catch(error => {             
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data || 'Hubo un error en la solicitud.',
          });
        });
        dispatch(emptyCartLS());
    } else {
      return;
    }
}, [isAuthenticated]);
  
  const cartApi = useSelector(state => state.apiCart);
  const productsMessage = cartApi.productos?.map((product) => {
    
    return `
    ${product.name.charAt(0).toUpperCase() + product.name.slice(1)}
    Cantidad: ${product.cantidad} 
   Precio: $ ${product.cantidad * product.precio_venta}.00`;

  }).join('\n');

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [emailSent, setEmailSent] = useState(false);
  console.log(cartApi);


  useEffect (
    () => {
      dispatch(clientes())
    }
  ,[]);

  const currentUser = usuarios?.find((usuario) => {
    return usuario?.name.toLowerCase() === user?.name.toLowerCase() && usuario?.correo_electronico.toLowerCase() === user.email.toLowerCase();
  });


  const handleButtonClick = () => {
    const serviceId = 'service_1g3c0si'
    const templateId = 'template_hj87mjd'
    const publicKey = 'kXx0ph3VN7L3t7N6a'

    const currentDate = new Date(); // Obtén la fecha y hora actual
    const formattedDate = `${currentDate.toLocaleDateString()} a las ${currentDate.toLocaleTimeString()}`; // Formatea la fecha y hora en una cadena legible para el usuario
    const message = `
      Gracias por realizar tu compra con nosotros!

      Detalles de tu compra:
      Usuario: ${currentUser?.name}
      Email: ${currentUser?.correo_electronico}
      Fecha: ${formattedDate}
  
      Productos comprados:
      ${productsMessage}

    Saludos cordiales,
    Enmable Team.
  
    `;
    // Lógica para enviar el correo electrónico con los detalles de la compra
    // utilizando la librería emailjs-com
    emailjs.send( serviceId , templateId, {name: currentUser?.name,  to_email: currentUser?.correo_electronico ,message: message, }, publicKey)
      .then(() => {
        setEmailSent(true);
        console.log(`     
          Usuario: ${currentUser?.name}
          Email: ${currentUser?.correo_electronico}
          Fecha: ${formattedDate}`);
      })
      .catch((error) => {
        console.log('Ha ocurrido un error al enviar el correo electrónico:', error);
      });
      axios.put(`/carrito/pagado/${currentUser?.id}`, { pagado: true })
      navigate('/catalogo')
  };
  
  return (
    <div className="bg-gray-100 py-40">
      <div className="flex items-center justify-center h-full">
        <div className="bg-white justify-center border border-gray-300 rounded-lg shadow-lg px-6 py-4">
          <h2 className="text-3xl font-bold text-center mb-4">Pago exitoso</h2>
          <p className="text-lg font-medium mb-6">Tu compra ha sido procesada con éxito.</p>
          <div className='flex justify-center'>
          <button
            className="bg-blue-500 justify-center text-white hover:bg-white hover:text-gray-700 font-bold py-2 px-4 rounded mr-4"
            onClick={handleButtonClick}>
            OK
          </button>
          </div>
          {emailSent && <p className="text-green-500 font-medium mt-4">Se ha enviado un correo electrónico con los detalles de la compra.</p>}
        </div>
      </div>
    </div>
  );
};

export default PagoExitoso;