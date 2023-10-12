import ReviwerM from "../../components/modalReviwers/ReviwerM"
import ReviwerE from "../../components/modalReviwers/ReviwerE"
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  const { user } = useAuth0();
  const usuarios = useSelector((state)=> state.Allclients);
  const currentUser = usuarios.find((usuario) => {
    return usuario.name.toLowerCase() === user.name.toLowerCase() && usuario.correo_electronico.toLowerCase() === user.email.toLowerCase();
  });
  console.log(currentUser);

console.log(product)
  return (
    <div className="p-4 my-4 bg-white rounded-md shadow-md">
      <div className="flex flex-row items-center">
        <Link to={`/detail/${product.productoId}`}>
        <img src={product.imagenProducto} alt={product.productoName} className="h-24 w-24 object-cover border-2 border-indigo-200 rounded-md mr-4" />  
      </Link>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col">
          <h1 className="text-lg capitalize font-medium">{product.productoName}</h1>
          <span className="ml-1 text-sm mt-2 text-gray-500">{product.cantidad} {product.cantidad === 1 ? 'Producto' : 'Productos'}</span>
          </div>
          <br />
          <p className="text-sm font-medium text-right">Fecha: {product.fechaCompra.split(',')[0]}</p>
        </div>
      </div>
      {/* <p className="mt-1 text-sm text-gray-600 font-medium">{product.description}</p> */}
      <hr className="my-4 border-gray-300 w-11/12 mx-auto" />
      <div className="flex justify-between">
        <p className="text-md font-medium">Total: {product.productoPrecio * product.cantidad} $</p>
        {product.reseñas.length > 0 ? (
          <ReviwerE productoId={product.productoId} clienteId={currentUser?.id.split('-')[1]} />
          ) : (
            <ReviwerM productoId={product.productoId} clienteId={currentUser?.id.split('-')[1]} />
        )}
      </div>
    </div>
  );
};
export default ProductCard;