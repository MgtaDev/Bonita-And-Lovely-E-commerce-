import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { sizes, categories, brands } from "../../redux/actions";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("El nombre del producto es obligatorio")
    .min(5, "El nombre debe tener al menos 5 caracteres")
    .max(50, "El nombre no debe exceder los 50 caracteres"),
  descripcion: yup
    .string()
    .required("La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(200, "La descripción no debe exceder los 200 caracteres"),
  precio_compra: yup
    .number()
    .required("El precio del producto es obligatorio")
    .positive("El precio debe ser un número positivo")
    .min(1000, "El precio mínimo es 1000")
    .max(1000000, "El precio máximo es 1000000"),
  porcentaje_ganancia: yup
    .number()
    .required("El porcentaje de ganancia es obligatorio")
    .min(10, "El porcentaje mínimo de ganancia es 10")
    .max(100, "El porcentaje máximo de ganancia es 100"),
  precio_venta: yup
    .number()
    .required("El precio de venta es obligatorio")
    .positive("El precio de venta debe ser un número positivo")
    .min(0.01, "El precio mínimo de venta es 0.01")
    .max(99999.99, "El precio máximo de venta es 99999.99"),
  referencia_proveedor: yup
    .string()
    .required("La referencia del proveedor es obligatoria"),
  marcaId: yup.number().required("Selecciona una marca"),
  categoriaId: yup.number().required("Selecciona una categoría"),
  tamañoId: yup.number().required("Selecciona un tamaño"),
  proveedorId: yup.number().required("Selecciona un proveedor"),
});

const Form = () => {
  const dispatch = useDispatch();
  const sizesOptions = useSelector((state) => state.Allsizes);
  const categoriesOptions = useSelector((state) => state.Allcategories);
  const brandsOptions = useSelector((state) => state.Allbrands);

  const [imageUrl, setImageUrl] = useState("");

  const imgbbApiKey = "cf44a253679320997c892d7e7a273f04";
  const imgbbUploadUrl = "https://api.imgbb.com/1/upload";

  useEffect(() => {
    dispatch(sizes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(categories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(brands());
  }, [dispatch]);

  //obtener proveedores
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    axios
      .get("/proveedor")
      .then((response) => {
        setProviders(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los proveedores:", error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      descripcion: "",
      imagenPrincipal: null,
      precio_compra: "",
      porcentaje_ganancia: 10,
      precio_venta: "",
      referencia_proveedor: "",
      marcaId: "",
      categoriaId: "",
      tamañoId: "",
      proveedorId: "",
      subcategoriaId: [ 12, 9, 19, 16 ],
      imagenes: [8,38,36,14,4,27],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("Valores enviados:", values);
      
      try {
        const imageUrl = await handleImageUpload(values.imagenPrincipal);
        
        console.log(imageUrl);
        // Actualiza los valores con la URL de la imagen subida
        const updatedValues = {
          ...values,
          imagenPrincipal: imageUrl,
        };
        
        console.log(updatedValues);
        // Realiza la solicitud al servidor para crear el producto
        const responseProducto = await axios.post("/producto", updatedValues);
        
        console.log("Producto creado:", responseProducto.data);
        // resetForm();
      } catch (error) {
        console.error("Error al crear el producto:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  
  console.log(formik.values);
  console.log(formik);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleImageUpload = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("key", imgbbApiKey);
      formData.append("image", imageFile);

      const response = await axios.post(imgbbUploadUrl, formData);
      return response.data.data.url;
    } catch (error) {
      console.error("Error al subir la imagen a imgbb:", error);
      throw error;
    }
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedProviderObj = providers.find(
      (option) => option.id === Number(selectedValue)
    );
    if (selectedProviderObj) {
      setSelectedProvider(selectedProviderObj);
      formik.setFieldValue("proveedorId", selectedProviderObj.id);
    }
  };

  const handleSelectChangeBrands = (event) => {
    const selectedValue = event.target.value;
    const splitValues = selectedValue.split("-");
    const selectedBrandId = splitValues[1];
    const selectedBrandsObj = brandsOptions.find(
      (option) => option.id === selectedValue
    );
    if (selectedBrandsObj) {
      setSelectedBrand(selectedBrandsObj);
      formik.setFieldValue("marcaId", selectedBrandId);
    }
  };

  const handleSelectChangeCategories = (event) => {
    const selectedValue = event.target.value;
    const splitValues = selectedValue.split("-");
    const selectedCategoriesId = splitValues[1];
    const selectedCategoriesObj = categoriesOptions.find(
      (option) => option.id === selectedValue
    );
    if (selectedCategoriesObj) {
      setSelectedCategories(selectedCategoriesObj);
      formik.setFieldValue("categoriaId", selectedCategoriesId);
    }
  };

  const handleSelectChangeSize = (event) => {
    const selectedValue = event.target.value;
    const splitValues = selectedValue.split("-");
    const selectedSizeId = splitValues[1];
    const selectedSizeObj = sizesOptions.find(
      (option) => option.id === selectedValue
    );
    if (selectedSizeObj) {
      setSelectedSize(selectedSizeObj);
      formik.setFieldValue("tamañoId", selectedSizeId);
    }
  };

  return (
    // <div className="bg-gray-100 min-h-screen flex justify-center items-center">
    //   <form
    //     onSubmit={formik.handleSubmit}
    //     className="bg-white w-full md:w-4/5 lg:w-3/5 font-medium rounded-md shadow-md px-10 pt-8 pb-6 flex"
    //   >
    //     <div className="flex-1 pr-10">
    //       <h1 className="text-3xl text-gray-800 mb-4 ">
    //         Crear Producto
    //       </h1>
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    //         {/* Nombre del Producto */}
    //         <div>
    //           <label
    //             htmlFor="productName"
    //             className="font-medium text-gray-700 block mb-1"
    //           >
    //             Nombre del Producto
    //           </label>
    //           <input
    //             type="text"
    //             className={`border rounded-md p-11 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${
    //               formik.touched.name && formik.errors.name
    //                 ? "border-red-500"
    //                 : ""
    //             }`}
    //             id="productName"
    //             name="name"
    //             onChange={formik.handleChange}
    //             onBlur={formik.handleBlur}
    //             value={formik.values.name}
    //             required
    //           />
    //           {formik.touched.name && formik.errors.name && (
    //             <div className="text-red-500 text-sm mt-1 font-medium">
    //               {formik.errors.name}
    //             </div>
    //           )}
    //         </div>

    //         {/* Descripción del Producto */}
    //         <div>
    //           <label
    //             htmlFor="productDescription"
    //             className="font-medium text-gray-700 block mb-1"
    //           >
    //             Descripción del Producto
    //           </label>
    //           <textarea
    //             id="productDescription"
    //             name="descripcion"
    //             placeholder="Escriba una breve descripción del producto"
    //             rows="4"
    //             className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${
    //               formik.touched.descripcion && formik.errors.descripcion
    //                 ? "border-red-500"
    //                 : ""
    //             }`}
    //             onChange={formik.handleChange}
    //             onBlur={formik.handleBlur}
    //             value={formik.values.descripcion}
    //             required
    //           ></textarea>
    //           {formik.touched.descripcion && formik.errors.descripcion && (
    //             <div className="text-red-500 text-sm mt-1 font-medium">
    //               {formik.errors.descripcion}
    //             </div>
    //           )}
    //         </div>

    //         {/* Precio de Compra */}
    //         <div>
    //           <label
    //             htmlFor="productPrice"
    //             className="font-medium text-gray-700 block mb-1"
    //           >
    //             Precio de Compra
    //           </label>
    //           <div className="flex items-center">
    //             <span className="mr-2">$</span>
    //             <input
    //               type="text"
    //               className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${
    //                 formik.touched.precio_compra &&
    //                 formik.errors.precio_compra
    //                   ? "border-red-500"
    //                   : ""
    //               }`}
    //               id="productPrice"
    //               name="precio_compra"
    //               onChange={formik.handleChange}
    //               onBlur={formik.handleBlur}
    //               value={formik.values.precio_compra}
    //               required
    //               inputMode="numeric"
    //             />
    //           </div>
    //           {formik.touched.precio_compra && formik.errors.precio_compra && (
    //             <div className="text-red-500 text-sm mt-1 font-medium">
    //               {formik.errors.precio_compra}
    //             </div>
    //           )}
    //         </div>


    //         {/* Precio de Venta */}
    //         <div>
    //           <label
    //             htmlFor="salePrice"
    //             className="font-medium text-gray-700 block mb-1"
    //           >
    //             Precio de Venta
    //           </label>
    //           <div className="flex items-center">
    //             <span className="mr-2">$</span>
    //             <input
    //               type="text"
    //               className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${
    //                 formik.touched.precio_venta && formik.errors.precio_venta
    //                   ? "border-red-500"
    //                   : ""
    //               }`}
    //               id="salePrice"
    //               name="precio_venta"
    //               onChange={formik.handleChange}
    //               onBlur={formik.handleBlur}
    //               value={formik.values.precio_venta}
    //               required
    //             />
    //           </div>
    //           {formik.touched.precio_venta && formik.errors.precio_venta && (
    //             <div className="text-red-500 text-sm mt-1 font-medium">
    //               {formik.errors.precio_venta}
    //             </div>
    //           )}
    //         </div>


    //         {/* Marca */}
    //         <div>
    //           <label
    //             htmlFor="productBrand"
    //             className="font-medium text-gray-700 block mb-1"
    //           >
    //             Marca
    //           </label>
    //           <div className="relative">
    //             <select
    //               id="productBrand"
    //               value={
    //                 selectedBrand && selectedBrand.id ? selectedBrand.id : ""
    //               }
    //               onChange={handleSelectChangeBrands}
    //               name="marcaId"
    //               className={`appearance-none w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${
    //                 formik.touched.marcaId && formik.errors.marcaId
    //                   ? "border-red-500"
    //                   : ""
    //               }`}
    //               required
    //             >
    //               <option value="">Seleccionar</option>
    //               {brandsOptions.map((option) => (
    //                 <option key={option.id} value={option.id}>
    //                   {option.name}
    //                 </option>
    //               ))}
    //             </select>
    //             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
    //               <svg
    //                 className="h-4 w-4 text-gray-500"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 viewBox="0 0 24 24"
    //                 xmlns="http://www.w3.org/2000/svg"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth="2"
    //                   d="M9 5l7 7-7 7"
    //                 />
    //               </svg>
    //             </div>
    //           </div>
    //           {formik.touched.marcaId && formik.errors.marcaId && (
    //             <div className="text-red-500 text-sm mt-1 font-medium">
    //               {formik.errors.marcaId}
    //             </div>
    //           )}
    //         </div>


    //         {/* Categoría */}
    //         <div>
    //           <label
    //             htmlFor="productCategory"
    //             className="font-medium text-gray-700 block mb-1"
    //           >
    //             Categoría
    //           </label>
    //           <div className="relative">
    //             <select
    //               id="productCategory"
    //               value={
    //                 selectedCategories && selectedCategories.id
    //                   ? selectedCategories.id
    //                   : ""
    //               }
    //               onChange={handleSelectChangeCategories}
    //               name="categoriaId"
    //               className={`appearance-none w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${
    //                 formik.touched.categoriaId && formik.errors.categoriaId
    //                   ? "border-red-500"
    //                   : ""
    //               }`}
    //               required
    //             >
    //               <option value="">Seleccionar</option>
    //               {categoriesOptions.map((option) => (
    //                 <option key={option.id} value={option.id}>
    //                   {option.name}
    //                 </option>
    //               ))}
    //             </select>
    //             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
    //               <svg
    //                 className="h-4 w-4 text-gray-500"
    //                 fill="none"
    //                 stroke="currentColor"
    //                   viewBox="0 0 24 24"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth="2"
    //                     d="M9 5l7 7-7 7"
    //                   />
    //                 </svg>
    //               </div>
    //             </div>
    //             {formik.touched.categoriaId && formik.errors.categoriaId && (
    //               <div className="text-red-500 text-sm mt-1 font-medium">
    //                 {formik.errors.categoriaId}
    //               </div>
    //             )}
    //         </div>

    //         {/* Tamaño */}
    //         <div>
    //             <label
    //               htmlFor="productSize"
    //               className="font-medium text-gray-700 block mb-1"
    //             >
    //               Tamaño
    //             </label>
    //             <div className="relative">
    //               <select
    //                 id="productSize"
    //                 value={
    //                   selectedSize && selectedSize.id ? selectedSize.id : ""
    //                 }
    //                 onChange={handleSelectChangeSize}
    //                 name="tamañoId"
    //                 className={`appearance-none w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${
    //                   formik.touched.tamañoId && formik.errors.tamañoId
    //                     ? "border-red-500"
    //                     : ""
    //                 }`}
    //                 required
    //               >
    //                 <option value="">Seleccionar</option>
    //                 {sizesOptions.map((option) => (
    //                   <option key={option.id} value={option.id}>
    //                     {option.name}
    //                   </option>
    //                 ))}
    //               </select>
    //               <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
    //                 <svg
    //                   className="h-4 w-4 text-gray-500"
    //                   fill="none"
    //                   stroke="currentColor"
    //                   viewBox="0 0 24 24"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth="2"
    //                     d="M9 5l7 7-7 7"
    //                   />
    //                 </svg>
    //               </div>
    //             </div>
    //             {formik.touched.tamañoId && formik.errors.tamañoId && (
    //               <div className="text-red-500 text-sm mt-1 font-medium">
    //                 {formik.errors.tamañoId}
    //               </div>
    //             )}
    //         </div>

    //         </div>
    //       </div>

    //       <div className="flex flex-col items-center md:items-start pt-6 md:pt-8">
    //         {/* Imagen */}
    //         <div className="w-full max-w-xs md:max-w-sm lg:max-w-md h-64 bg-gray-200 rounded-lg overflow-hidden mb-6 md:mb-0">
    //           <label
    //             htmlFor="imageUpload"
    //             className="cursor-pointer flex items-center justify-center w-full h-full"
    //           >
    //             {formik.values.imagenPrincipal ? (
    //               <img
    //                 src={URL.createObjectURL(formik.values.imagenPrincipal)}
    //                 alt="Imagen seleccionada"
    //                 className="w-full h-full object-cover"
    //               />
    //             ) : (
    //               <svg
    //                 className="h-20 w-20 text-gray-500"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //               >
    //                 <path
    //                   stroke="currentColor"
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth="1.5"
    //                   d="M10 15v4h4v-4m5-8l2 2m-2-2l-2 2m2-2V3a1 1 0 00-1-1H4a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V7l-6-6z"
    //                 />
    //               </svg>
    //             )}
    //           </label>
    //           <input
    //             type="file"
    //             id="imageUpload"
    //             name="imagenPrincipal"
    //             accept="image/*"
    //             className="hidden"
    //             onChange={(event) => {
    //               formik.setFieldValue(
    //                 "imagenPrincipal",
    //                 event.currentTarget.files[0]
    //               );
    //             }}
    //           />
    //           {formik.touched.imagenPrincipal &&
    //             formik.errors.imagenPrincipal && (
    //               <div className="text-red-500 text-sm mt-1 font-medium">
    //                 {formik.errors.imagenPrincipal}
    //               </div>
    //             )}
    //         </div>
    //         {/* Botón de crear */}
    //         <button
    //           type="submit"
    //           className="px-6 mt-3 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
    //         >
    //           Crear Producto
    //         </button>
    //       </div>

    //     </form>
    //   </div>
    <div className="flex justify-center items-center h-full">
        <div className="text-3xl text-gray-500 font-bold">Bajo mantenimiento</div>
      </div>
    );
  };

  export default Form;