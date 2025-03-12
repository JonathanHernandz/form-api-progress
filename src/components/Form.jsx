import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { use, useRef, useState } from "react";
import { handleSubmit } from "../handleSubmit";
import ReCAPTCHA from "react-google-recaptcha";


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const FormQuoteSchema = yup.object().shape({
  name: yup.string().required("Debe ingresar su nombre."),
  email: yup
    .string()
    .email("Ingrese un correo valido.")
    .required("Debe ingresar un correo."),
  number: yup.string().matches(phoneRegExp, 'Número de teléfono no válido').required('Debe ingresar un número de teléfono.').min(10, "too short")
    .max(10, "too long"),
  //quantity: yup.number().moreThan(0).required("Debe especificar la cantidad."),
  //deliveryType: yup.string().required("Debe elegir un tipo de entrega"),
  birthdate: yup.date().required("Debe ingresar su fecha de nacimiento."),
  tyc: yup.boolean().oneOf([true], "Debe aceptar los términos y condiciones."),
});

export const FormQuote = () => {
  const [success, setSuccess] = useState(false);


  const onChange = () => {
      console.log("Captcha ok");
  };


  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        number: "",
        //quantity: "",
        //deliveryType: "",
        birthdate: "",
        tyc: false,
      }}
      validationSchema={FormQuoteSchema}
      // onSubmit={(values, formikProps) => {
      //   setTimeout(() => {
      //     console.log(values);
      //     setSuccess(true);
      //     formikProps.resetForm();

      //   }, 3000);
      // }}
      onSubmit={(values, formikProps) => {

        handleSubmit(values, formikProps, setSuccess)
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        isSubmitting,
      }) => (
        <Form>
          {success && (
            <div className="notification is-success is-light">
              <strong>¡Gracias por enviar tu solicitud!</strong> Nuestro equipo
              se pondrá en contacto contigo pronto.
            </div>
          )}
          <p className="is-4 has-text-grey has-text-weight-bold">
            Información
          </p>
          <hr className="mt-2" />

          <div className="columns is-multiline">
          </div>

          <div className="column is_fullwidth is-12-mobile is-6-tablet is-12-desktop">
            <div className="field">
              <label htmlFor="name" className="label">
                Nombre
              </label>
              <div className="control">
                <Field id="name" name="name" type="input" className="input" />
                {/* <input
                    id="name"
                    type="text"
                    name="name"
                    className="input"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  /> */}
              </div>
              {touched.name && errors.name && (
                <p className="help is-danger">{errors.name}</p>
              )}
            </div>
            <div className="field">
              <label htmlFor="email" className="label">
                Correo
              </label>
              <div className="control ">
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="input"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {touched.email && errors.email && (
                <p className="help is-danger">{errors.email}</p>
              )}
            </div>


              <div className="field">
                <label htmlFor="number" className="label">
                  Numero de teléfono
                </label>
                <div className="control">
                  <Field id="number" name="number" type="input" className="input " />
                  {/* <input
                    id="name"
                    type="text"
                    name="name"
                    className="input"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  /> */}
                </div>
                {touched.number && errors.number && (
                  <p className="help is-danger">{errors.number}</p>
                )}
              </div>
              


              <div className="field ">
                <label htmlFor="birthdate" className="label">
                  Fecha de nacimiento
                </label>
                <div className="control">
                  <Field
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    className="input "
                    max={new Date().toISOString().split("T")[0]} // Restringe fechas futuras
                    onFocus={(e) => e.target.showPicker && e.target.showPicker()} // Abre el selector al hacer clic
                  />
                </div>
                {touched.birthdate && errors.birthdate && (
                  <p className="help is-danger">{errors.birthdate}</p>
                )}
              </div>


          </div>



          {/* <p className="is-4 has-text-grey has-text-weight-bold mb-0 mt-5">
            Información adicional
          </p>
          <hr className="mt-2" /> */}
          {/* <div className="columns"> */}
          {/* <div className="column">
              <div className="field">
                <label htmlFor="quantity" className="label">
                  Cantidad de productos
                </label>
                <div className="control">
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    className="input"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.quantity && errors.quantity && (
                  <p className="help is-danger">{errors.quantity}</p>
                )}
              </div>
            </div> */}
          {/* <div className="column">
              <div className="field">
                <label htmlFor="deliveryType" className="label">
                  Tipo de entrega
                </label>
                <div className="select">
                  <Field id="deliveryType" name="deliveryType" as="select">
                    <option value="">Seleccionar</option>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Recojo en tienda</option>
                  </Field>
                  {/* <select  // * YA ESTABA COMENTADO
                    id="deliveryType"
                    value={values.deliveryType}
                    name="deliveryType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Seleccionar</option>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Recojo en tienda</option>
                  </select> 
                </div>
                {touched.deliveryType && errors.deliveryType && (
                  <p className="help is-danger">{errors.deliveryType}</p>
                )}
              </div>
            </div> */}
          {/* </div> */}
          <hr className="mt-2" />

          <label className="checkbox">
            <input
              type="checkbox"
              name="tyc"
              checked={values.tyc}
              onChange={handleChange}
              onBlur={handleBlur}
            />{" "}
            Acepto los términos y condiciones
            {touched.tyc && errors.tyc && (
              <p className="help is-danger">{errors.tyc}</p>
            )}
          </label>
          <div className="is-flex is-justify-content-center mt-4">
         
                <ReCAPTCHA
                    sitekey="6Lc-pvEqAAAAAMljUFGofBPeAmo07F2GFYUDiyVE"
                    onChange={onChange}
                />



            
          </div>


          
          <div className="mt-4 is-flex is-justify-content-flex-end">
            <button
              className={`button is-success ${isSubmitting ? "is-loading" : ""
                }`.trim()}
              type="submit"
            >
              Aceptar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
