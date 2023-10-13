import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import emailjs from 'emailjs-com';
import { useSelector } from "react-redux";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();
  const clientes = useSelector((state) => state.Allclients);
  const [emailSent, setEmailSent] = useState(false);

  

  const handleLogin = async () => {
    await loginWithRedirect();
  };


  if (isAuthenticated && user) {
    const serviceId = 'service_1g3c0si'
    const templateId = 'template_7dsbo67'
    const publicKey = 'kXx0ph3VN7L3t7N6a'
    const { name, email } = user;
    const admin = email === 'passantinodev@gmail.com' ? true : false;
    const userLogin = { name, correo_electronico: email, admin };
    const existeCliente = clientes.find((cliente) => cliente.correo_electronico === email);
  
    if (existeCliente) {
      console.log("El cliente ya existe en la base de datos");
    } else {
      axios.post("/cliente", userLogin)
        .then(response => {
          console.log("El cliente se ha creado con éxito: ", response);
          const currentDate = new Date(); // Obtén la fecha y hora actual
          const formattedDate = `${currentDate.toLocaleDateString()} a las ${currentDate.toLocaleTimeString()}`; // Formatea la fecha y hora en una cadena legible para el usuario
          
          
  
          emailjs.send(serviceId, templateId, {name: name, to_email: email }, publicKey)
            .then(() => {
              setEmailSent(true);
            })
            .catch((error) => {
              console.log('Ha ocurrido un error al enviar el correo electrónico:', error);
            });
        })
        .catch(error => {
          console.error("Error al crear el cliente: ", error.message);
        });
    }
  }

  return (
    <>
    {isAuthenticated ? (
      <div></div>
    ) : (
      <>
            <button onClick={handleLogin} className="purpleSet text-white font-bold py-2 px-4 rounded-full">Login</button>
            </>
    
    )}
  </>
  )
  }

export default LoginButton;