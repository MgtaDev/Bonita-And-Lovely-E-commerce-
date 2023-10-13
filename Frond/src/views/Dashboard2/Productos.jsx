import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { products } from "../../redux/actions";
import { BsCheckCircle } from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import axios from "axios";

import Swal from 'sweetalert2'


const ProductosTable = () => {
  const dispatch = useDispatch()
  const stateProducts = useSelector(state => state.Allproducts);
  const [disableTF, setDisableTF] = useState(true);
  const [pageNumberNx, setPageNumberNx] = useState(0);
  const numberSize = 20;
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  console.log(stateProducts)

  const handlerPageNumber = (index) => {
    setPageNumberNx(index);
  };

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
      setDisableTF(pageNumberNx <= 0 || pageNumberNx >= stateProducts.paginas - 1);
    },
    [dispatch, pageNumberNx, numberSize, stateProducts.paginas]
  );

  const handlePageClick = (newPageNumber) => {
    // Limitar la navegación entre las páginas 1 y 3
    if (newPageNumber < 0) {
      newPageNumber = 0;
    } else if (newPageNumber > 2) {
      newPageNumber = 2;
    }
    setPageNumber(newPageNumber);
    const queries = {
      page: newPageNumber,
      size: numberSize
    };
    dispatch(products(queries));
  };
  const [pageNumber, setPageNumber] = useState(0);

  const renderPageButtons = () => {
    const pages = [];
    for (let i = 0; i < 3; i++) {
      pages.push(
        <button
          key={i}
          className={`border-solid rounded border border-[255 255 255] px-3 py-1 mx-1 text-lg font-semibold text-slate-400 focus:text-slate-950 focus:border-slate-950 ${
            i === pageNumber ? "bg-slate-950 text-white" : ""
          }`}
          disabled={i === pageNumber || stateProducts.loading}
          onClick={() => handlePageClick(i)}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };
  

  //delete or add product
  const deleteProductAlert = (id) => {
    const deleteProduct = (id) => {
      const extractIdNumber = (id) => {
        const idParts = id.split('-'); // Separa el string en partes utilizando el carácter "-"
        return parseInt(idParts[1]); // Convierte la segunda parte a un número entero y lo retorna
      };
      const idNumber = extractIdNumber(id); // Extrae el número del id
      axios.delete(`/producto/${idNumber}`)
        .then((response) => {
          console.log(response.data);
          dispatch(products({page: pageNumberNx, size: numberSize}));
          setDisableTF(pageNumberNx <= 0 || pageNumberNx >= response.data.paginas - 1);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    Swal.fire({
      title: 'Estas seguro?',
      text: "Al aceptar eliminaras este producto del catalogo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      deleteProduct(id)
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'Este producto ha sido eliminado correctamente',
          'success'
        )
      }
    })
    }
  const addProductAlert = (id) => {
      const addProduct = (id) => {
        const extractIdNumber = (id) => {
          const idParts = id.split('-'); // Separa el string en partes utilizando el carácter "-"
          return parseInt(idParts[1]); // Convierte la segunda parte a un número entero y lo retorna
        };
        const idNumber = extractIdNumber(id); // Extrae el número del id
        axios.put(`/producto/activate/${idNumber}`)
          .then((response) => {
            console.log(response.data);
            dispatch(products({page: pageNumberNx, size: numberSize}));
            setDisableTF(pageNumberNx <= 0 || pageNumberNx >= response.data.paginas - 1);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      Swal.fire({
        title: 'Añadir de nuevo?',
        text: "Al aceptar agregaras de nuevo este producto al catalogo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, agregar'
      }).then((result) => {
        addProduct(id)
        if (result.isConfirmed) {
          Swal.fire(
            'Agregado!',
            'El producto ha sido agregado de vuelta al catalogo',
            'success'
          )
        }
      })
    }

  //Edit alert
  const editProductAlert = (productId) => {
    const productIdSplit = productId.split('-')[1];
  
    Swal.fire({
      title: 'Quieres editar este producto?',
      text: "Al aceptar podras cambiar los datos de este producto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, editar'
    }).then((result) => {
      if (result.isConfirmed) {
        const editForm = document.createElement('form');
        editForm.className = 'mt-4';
  
        const idInput = document.createElement('input');
        idInput.className = 'hidden';
        idInput.type = 'hidden';
        idInput.name = 'id';
        idInput.value = productId;
  
        const nameInput = document.createElement('input');
        nameInput.className =
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2';
        nameInput.type = 'text';
        nameInput.name = 'name';
        nameInput.placeholder = 'Nombre';
  
        const imagenPrincipalInput = document.createElement('input');
        imagenPrincipalInput.className =
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2';
        imagenPrincipalInput.type = 'text';
        imagenPrincipalInput.name = 'imagenPrincipal';
        imagenPrincipalInput.placeholder = 'Imagen Principal';
  
        const imagenesInput = document.createElement('input');
        imagenesInput.className =
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2';
        imagenesInput.type = 'file';
        imagenesInput.name = 'imagenes';
  
        const descripcionTextarea = document.createElement('textarea');
        descripcionTextarea.className =
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2';
        descripcionTextarea.name = 'descripcion';
        descripcionTextarea.placeholder = 'Descripción';
  
        const precioCompraInput = document.createElement('input');
        precioCompraInput.className =
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2';
        precioCompraInput.type = 'number';
        precioCompraInput.name = 'precioCompra';
        precioCompraInput.placeholder = 'Precio de Compra';
  
        const porcentajeGananciaInput = document.createElement('input');
        porcentajeGananciaInput.className =
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2';
        porcentajeGananciaInput.type = 'number';
        porcentajeGananciaInput.name = 'porcentajeGanancia';
        porcentajeGananciaInput.placeholder = 'Porcentaje de Ganancia';
  
        const precioVentaInput = document.createElement('input');
        precioVentaInput.className =
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2';
        precioVentaInput.type = 'number';
        precioVentaInput.name = 'precioVenta';
        precioVentaInput.placeholder = 'Precio de Venta';
  
        const referenciaProveedorInput = document.createElement('input');
        referenciaProveedorInput.className =
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2';
        referenciaProveedorInput.type = 'text';
        referenciaProveedorInput.name = 'referenciaProveedor';
        referenciaProveedorInput.placeholder = 'Referencia del Proveedor';
  
        const marcaIdInput = document.createElement('input');
        marcaIdInput.className =
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2';
        marcaIdInput.type = 'text';
        marcaIdInput.name = 'marcaId';
        marcaIdInput.placeholder = 'Marca';
  
        const categoriaIdInput = document.createElement('input');
        categoriaIdInput.className =
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2';
        categoriaIdInput.type = 'text';
        categoriaIdInput.name = 'categoriaId';
        categoriaIdInput.placeholder = 'Categoria';
  
        const tamañoIdInput = document.createElement('input');
        tamañoIdInput.className =
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2';
        tamañoIdInput.type = 'text';
        tamañoIdInput.name = 'tamañoId';
        tamañoIdInput.placeholder = 'Tamaño';
  
        const proveedorIdInput = document.createElement('input');
        proveedorIdInput.className =
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2';
        proveedorIdInput.type = 'text';
        proveedorIdInput.name = 'proveedorId';
        proveedorIdInput.placeholder = 'Proveedor';
  
        const subcategoriaInput = document.createElement('input');
        subcategoriaInput.className =
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2';
        subcategoriaInput.type = 'text';
        subcategoriaInput.name = 'subcategoria';
        subcategoriaInput.placeholder = 'Subcategoria';
  
        editForm.appendChild(idInput);
        editForm.appendChild(nameInput);
        editForm.appendChild(imagenPrincipalInput);
        editForm.appendChild(imagenesInput);
        editForm.appendChild(descripcionTextarea);
        editForm.appendChild(precioCompraInput);
        editForm.appendChild(porcentajeGananciaInput);
        editForm.appendChild(precioVentaInput);
        editForm.appendChild(referenciaProveedorInput);
        editForm.appendChild(marcaIdInput);
        editForm.appendChild(categoriaIdInput);
        editForm.appendChild(tamañoIdInput);
        editForm.appendChild(proveedorIdInput);
        editForm.appendChild(subcategoriaInput);
  
        Swal.fire({
          title: 'Editar Producto',
          html: editForm.outerHTML,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Guardar Cambios'
        }).then((result) => {
          if (result.isConfirmed) {
            const formData = new FormData(editForm);
            const name = formData.get('name');
            const imagenPrincipal = formData.get('imagenPrincipal');
            const descripcion = formData.get('descripcion');
            const precioCompra = formData.get('precioCompra');
            const porcentajeGanancia = formData.get('porcentajeGanancia');
            const precioVenta = formData.get('precioVenta');
            const referenciaProveedor = formData.get('referenciaProveedor');
            const marcaId = formData.get('marcaId');
            const categoriaId = formData.get('categoriaId');
            const tamañoId = formData.get('tamañoId');
            const proveedorId = formData.get('proveedorId');
            const subcategoria = formData.get('subcategoria');
  
            axios.put(`/producto/${productIdSplit}`, {
              name: name,
              imagenPrincipal: imagenPrincipal,
              descripcion: descripcion,
              precio_compra: precioCompra,
              porcentaje_ganancia: porcentajeGanancia,
              precio_venta: precioVenta,
              referencia_proveedor: referenciaProveedor,
              marcaId: marcaId,
              categoriaId: categoriaId,
              tamañoId: tamañoId,
              proveedorId: proveedorId,
              Subcategoria: subcategoria,
            }).then((response) => {
              Swal.fire(
                'Editado!',
                'El producto ha sido editado exitosamente',
                'success'
              );
              dispatch(products({page: pageNumberNx, size: numberSize}));
              setDisableTF(pageNumberNx <= 0 || pageNumberNx >= response.data.paginas - 1);
              // Resto del código aquí...
            }).catch((error) => {
              Swal.fire(
                'Error!',
                'Ha ocurrido un error al editar el producto',
                'error'
              );
              console.log(error);
            });
          }
        });
      }
    });
  }
  


  return (
    <>
      <table className="w-full rounded-lg overflow-hidden">
        <thead className="bg-gray-100 uppercase text-sm leading-normal">
          <tr className="text-gray-600">
            <th className="border-0 px-6 py-4 font-bold">ID</th>
            <th className="border-0 px-6 py-4 font-bold">Nombre</th>
            <th className="border-0 px-6 py-4 font-bold">Inventario</th>
            <th className="border-0 px-6 py-4 font-bold">Estado</th>
            <th className="border-0 px-6 py-4 font-bold">Editar</th>
            <th className="border-0 px-6 py-4 font-bold">Borrar</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {stateProducts.productos.sort((a, b) => a.id - b.id).map((product) => (
            <tr key={product.id} className="border-t">
              <td className="px-6 text-center capitalize py-10">{product.id}</td>
              <td className="px-6 text-center capitalize py-10">{product.name}</td>
              <td className="px-6 text-center py-10">{product.cantidad} unidades</td>
              <td className="px-6 l text-center py-10">
              {product.activa === true ? (
                <div className="d-flex align-items-center">
                  <span>Activo</span>

                  <BsCheckCircle className="mr-3 relative bottom-4" />
                </div>
              ) : (
                <>
                  <span>Oculto</span>
                  <BsXCircle className="mr-3 relative bottom-4" />
              </>
              )}</td>
              <td className="px-6 text-center py-4">
                <button onClick={()=>editProductAlert(product.id)} className="bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-700">

                  Editar
                </button>
              </td>
              <td className="px-6 text-center py-4">

              {product.activa === true
              ? <button onClick={()=> deleteProductAlert(product.id)} className="bg-red-500 hover:bg-gray-200 text-white font-bold py-2 px-4 rounded">Borrar</button>
              : <button onClick={()=> addProductAlert(product.id)} className="bg-green-500 hover:bg-gray-200 text-white font-bold py-2 px-4 rounded">Añadir</button>
              }

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex py-30 justify-center items-center space-x-2 mt-4 mb-10">
    
      <div className="flex justify-center py-10">
            <button
              disabled={disablePrev || stateProducts.loading}
              onClick={() => handlePageClick(pageNumber - 1)}
              className="mx-1 text-3xl"
            >
              {"<"}
            </button>
            {renderPageButtons()}
            <button
              disabled={disableNext || stateProducts.loading}
              onClick={() => handlePageClick(pageNumber + 1)}
              className="mx-1 text-3xl"
            >
              {">"}
            </button>

         
          </div>
    
    </div>
        </>
      );
};

export default ProductosTable;

