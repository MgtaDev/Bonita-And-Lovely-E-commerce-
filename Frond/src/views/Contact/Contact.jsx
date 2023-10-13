
import React, { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import emailjs from "emailjs-com"
import fond from "../../assets/img/poster1.jpg"
import Swal from 'sweetalert2';

//subi mis cambios ayer y eliminaron mi pull requets loco

const Contact = () => {
  const formRef = useRef();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      message: ""
    },
    validationSchema: yup.object({
      email: yup.string().email("invalid email address").required("requered"),
      name: yup
        .string()
        .max(15, "Must be 20 characters or less")
        .required("required"),
      message: yup.string().max(500, "maximum characters").required("required")
    }),
    onSubmit: (values, { resetForm }) => {
      emailjs
        .sendForm("service_1g3c0si", "template_hj87mjd", formRef.current, "kXx0ph3VN7L3t7N6a")
        .then(result => {
          console.log(result.text);
          resetForm();
          Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado',
            text: 'Tu mensaje se ha enviado correctamente.',
          });
        })
        .catch(error => {
          console.log(error.text);
          Swal.fire({
            icon: 'error',
            title: 'Error al enviar el mensaje',
            text: 'Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo nuevamente.',
          });
        });
    }
  });
  return (
<div>
    <section style={{ backgroundImage: `url(${fond})` }} >
    <div className="relative h-[300px] overflow-hidden bg-cover bg-center "></div>
    <div class="container md:px-12 m-auto py-10" >
      <div
        class="rounded-lg bg-[hsla(0,0%,100%,0.8)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:py-16 md:px-14 -mt-[300px] backdrop-blur-[30px] ">
        <div class="flex justify-center flex-wrap">
          <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
          <form
        className="w-full  m-auto grid gap-4 p-6 md:p-10 rounded-md"
        onSubmit={formik.handleSubmit}
        ref={formRef}
      >
        <input
          type="text"
          name="name"
          placeholder="Ingresa su nombre"
          onBlur={formik.handleBlur}
          value={formik.values.name}
          onChange={formik.handleChange}
          className={`w-full p-2 border rounded focus:outline-none focus:ring ${
            formik.touched.name && formik.errors.name
              ? "border-red-500" 
              : "focus:border-blue-300"
          }`}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500">{formik.errors.name}</div>
        ) : null}
        <input
          type="email"
          name="email"
          placeholder="Ingrese su email"
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
          className={`w-full p-2 border rounded focus:outline-none focus:ring ${
            formik.touched.email && formik.errors.email
              ? "border-red-500" // Aplica borde rojo en caso de error
              : "focus:border-blue-300"
          }`}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}
        <textarea
          name="message"
          placeholder="Escriba tu mensaje aqui"
          onBlur={formik.handleBlur}
          value={formik.values.message}
          onChange={formik.handleChange}
          rows={6}
          className={`w-full p-2 border rounded focus:outline-none focus:ring ${
            formik.touched.message && formik.errors.message
              ? "border-red-500" // Aplica borde rojo en caso de error
              : "focus:border-blue-300"
          }`}
        />
        {formik.touched.message && formik.errors.message ? (
          <div className="text-red-500">{formik.errors.message}</div>
        ) : null}
        <input
          type="submit"
          value="Enviar"
          className="pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        />
      </form>
          </div>
          <div class="w-full shrink-0 grow-0 basis-auto lg:w-7/12 text-slate-50 p-10">
            <h2 class="text-3xl pb-5">Ponte en contacto con nosotros</h2>
              <p class=" text-lg">
Desde Enmable, valoramos tu experiencia de compra y estamos aquí para responder cualquier pregunta que puedas tener. Si necesitas ayuda para elegir los productos adecuados, asesoramiento a la hora de adquirir cualquiera de nuestros productos o simplemente quieres compartir tus comentarios, no dudes en ponerte en contacto con nuestro amable equipo de atención al cliente.
</p>
<p class="pt-5">Enmable c.a</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
  );
};

export default Contact;
