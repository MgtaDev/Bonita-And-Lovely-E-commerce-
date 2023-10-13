import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { products } from "../../redux/actions";
import { BsCheckCircle } from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import axios from "axios";
import { clientes } from '../../redux/actions.js'

import Swal from 'sweetalert2'

const ClientesTable = () => {
  useEffect(
    () => {
      dispatch(clientes())
    },[])
  const dispatch = useDispatch()
  const stateClients = useSelector(state => state.Allclients);
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPage, setSelectedPage] = useState(1)
  const [itemsPerPage] = useState(4)
  const lastClient = currentPage * itemsPerPage;
  const firtsClient = lastClient - itemsPerPage
  const currentClient = stateClients?.slice(firtsClient,lastClient)
  console.log(stateClients);
  const [disableTF, setDisableTF] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const numberSize = 10;

  const redirigirAlInicio = () => {
    window.scrollTo(0, 0);
  }



  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(stateClients?.length / itemsPerPage); i++) {
    pageNumbers.push({number:i, selected: i === selectedPage});
  }
  return pageNumbers;
};
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1 );
    setSelectedPage(selectedPage - 1);
  };
  
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1 );
    setSelectedPage(selectedPage + 1);
  };
  
  
const pageNumbers = generatePageNumbers();
  const handlerPageNumber = (index) => {
    setPageNumber(index);
  };
  console.log(stateClients)
  //Admin
  const makeAdminAlert = (id) => {
    const makeUserAdmin = (id) => {
      const extractIdNumber = (id) => {
        const idParts = id.split('-'); // Separa el string en partes utilizando el carácter "-"
        return parseInt(idParts[1]); // Convierte la segunda parte a un número entero y lo retorna
      };
      const idNumber = extractIdNumber(id); 
      axios.put(`/cliente/${idNumber}`, { admin: true })
        .then((response) => {
          console.log(response.data);
          dispatch(clientes())
        })
        .catch((error) => {
          console.log(error);
        });
    };
    Swal.fire({
      title: 'Estas seguro?',
      text: "Al aceptar, haras a este usuario administrador de la pagina",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, continuar!'
    }).then((result) => {
      makeUserAdmin(id)
      if (result.isConfirmed) {
        Swal.fire(
          'Hecho!',
          'Este usuario ahora es administrador',
          'success'
        )
      }
    })
  }
  const unmakeAdminAlert = (id) => {
    const unmakeUserAdmin = (id) => {
      const extractIdNumber = (id) => {
        const idParts = id.split('-'); // Separa el string en partes utilizando el carácter "-"
        return parseInt(idParts[1]); // Convierte la segunda parte a un número entero y lo retorna
      };
      const idNumber = extractIdNumber(id); 
      axios.put(`/cliente/${idNumber}`, { admin: false })
        .then((response) => {
          console.log(response.data);
          dispatch(clientes())
        })
        .catch((error) => {
          console.log(error);
        });
    };
    Swal.fire({
      title: 'Estas seguro?',
      text: "Al aceptar,le quitaras acceso de administrador a este usuario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, continuar!'
    }).then((result) => {
      unmakeUserAdmin(id)
      if (result.isConfirmed) {
        Swal.fire(
          'Hecho!',
          'Este usuario ya no es administrador',
          'success'
        )
      }
    })
  }

  //Ban
  const banAlert = (id) => {
  const banUser = (id) => {
    const extractIdNumber = (id) => {
      const idParts = id.split('-'); // Separa el string en partes utilizando el carácter "-"
      return parseInt(idParts[1]); // Convierte la segunda parte a un número entero y lo retorna
    };
    const idNumber = extractIdNumber(id); // Extrae el número del id
    axios.delete(`/cliente/${idNumber}`)
      .then((response) => {
        console.log(response.data);
        dispatch(clientes())
      })
      .catch((error) => {
        console.log(error);
      });
  };
  Swal.fire({
    title: 'Estas seguro?',
    text: "Le prohibiras el acceso a la pagina a este usuario!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, banear'
  }).then((result) => {
    banUser(id)
    if (result.isConfirmed) {
      Swal.fire(
        'Baneado!',
        'Este usuario ha sido baneado de manera indefinida.',
        'success'
      )
    }
  })
  }
  const  unbanAlert = (id) => {
    const unbanUser = (id) => {
      const extractIdNumber = (id) => {
        const idParts = id.split('-'); // Separa el string en partes utilizando el carácter "-"
        return parseInt(idParts[1]); // Convierte la segunda parte a un número entero y lo retorna
      };
      const idNumber = extractIdNumber(id); // Extrae el número del id
      axios.put(`/cliente/${idNumber}`, { activa: true })
        .then((response) => {
          console.log(response.data);
          dispatch(clientes())
        })
        .catch((error) => {
          console.log(error);
        });
    };
    Swal.fire({
      title: 'Estas seguro?',
      text: "Al aceptar le concederas acceso de nuevo a la pagina a este usuario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      unbanUser(id)
      if (result.isConfirmed) {
        Swal.fire(
          'Acceso renovado!',
          'Este usuario tiene acceso de nuevo a la pagina',
          'success'
        )
      }
    })
    }

  return (
    <>
    {
      stateClients?.length === 0 ? (
        <div className="flex justify-center items-center h-full">
        <div className="text-3xl text-gray-500 font-bold">No hay clientes aun...</div>
      </div>
      ) : (
        <>
          <table className="w-full rounded-lg overflow-hidden">
            <thead className="bg-gray-100 uppercase text-sm leading-normal">
              <tr className="text-gray-600">
                <th className="border-0 px-6 py-4 font-bold">Nombre</th>
                <th className="border-0 px-6 py-4 font-bold">Correo Electronico</th>
                <th className="border-0 px-6 py-4 font-bold">Direccion</th>
                <th className="border-0 px-6 py-4 font-bold">Estado</th>
                <th className="border-0 px-6 py-4 font-bold">Hacer admin</th>
                <th className="border-0 px-6 py-4 font-bold">Banear</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentClient?.map((client) => (
                <tr key={client.id} className="border-t">
                  <td className="px-6 text-center py-10">{client?.name}</td>
                  <td className="px-6 text-center py-10">{client?.correo_electronico}</td>
                  <td className="px-6 text-center py-10">{client?.direccion}</td>
                  <td className="px-6 l text-center py-10">
                  {client?.activa === true ? (
                    <div className="d-flex align-items-center">
                      <span>Activo</span>
                      <BsCheckCircle className="relative bottom-4" />
                    </div>
                  ) : (
                    <>
                      <span className="ml-3">Baneado</span>
                      <BsXCircle className="mr-5 relative bottom-4" />
                  </>
                  )}</td>
                  {
                      client?.correo_electronico === 'bonitaandlovely@gmail.com' 
                      ? 
                      <td className="px-6 text-center py-4">
                      <button className="bg-purple-500 hover:bg-gray-200 text-white font-bold py-2 px-4 rounded">Principal Admin</button>
                      </td>
                      : 
                      <td className="px-6 text-center py-4">
                      {client?.admin === false 
                      ? <button onClick={()=> makeAdminAlert(client?.id)} className="bg-indigo-800 hover:bg-gray-200 text-white font-bold py-2 px-4 rounded">Hacer admin</button>
                      : <button onClick={()=> unmakeAdminAlert(client?.id)} className="bg-black hover:bg-gray-200 text-white font-bold py-2 px-4 rounded">Quitar admin</button>
                      }
                      </td>
                  }
                
                  {
                    client?.correo_electronico !== 'bonitaandlovely@gmail.com' 
                    ? <td className="px-6 text-center py-4">
                    {client?.activa === true
                    ? <button onClick={()=> banAlert(client?.id)} className="bg-red-500 hover:bg-gray-200 text-white font-bold py-2 px-4 rounded">Banear</button>
                    : <button onClick={()=> unbanAlert(client?.id)} className="bg-green-500 hover:bg-gray-200 text-white font-bold py-2 px-4 rounded">Quitar baneo</button>
                    }
                    </td>
                    :''
                  }
                  
                </tr>
              ))}
            </tbody>
          </table>
    
          {/* Pagination Buttons */}
          <div className="flex justify-center py-8">
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                  setSelectedPage(selectedPage - 1)
                  redirigirAlInicio();
                }
              }}
              className="mx-1 text-2xl font-bold px-3 py-1 rounded bg-white text-black  focus:outline-none"
            >
              {"<"}
            </button>
            {pageNumbers.map(({ number, selected }) => (
              <button
                key={number}
                onClick={() => {
                  setCurrentPage(number);
                  setSelectedPage(number)
                  redirigirAlInicio();
                }}
                className={`mx-1 text-lg font-bold px-3 py-1 rounded ${selected ? 'bg-black text-white' : 'bg-white text-black '}`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => {
                if (currentPage < Math.ceil(stateClients?.length / itemsPerPage)) {
                  setCurrentPage(currentPage + 1);
                  setSelectedPage(selectedPage + 1)
                  redirigirAlInicio();
                }
              }}
              className="mx-1 text-2xl font-bold px-3 py-1 rounded bg-white text-gray-500 focus:outline-none"
            >
              {">"}
            </button>
          </div>
       </>
      )
    }
    </>
      );
};

export default ClientesTable;