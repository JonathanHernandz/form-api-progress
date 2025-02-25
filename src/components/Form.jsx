import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
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
  tyc: yup.boolean().oneOf([true], "Debe aceptar los términos y condiciones.")
});

export const FormQuote = () => {
  const [success, setSuccess] = useState(false);

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        number: "",
        //quantity: "",
        //deliveryType: "",
        tyc: false
      }}
      validationSchema={FormQuoteSchema}
      onSubmit={(values, formikProps) => {
        setTimeout(() => {
          console.log(values);
          setSuccess(true);
          formikProps.resetForm();
        }, 3000);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        isSubmitting
      }) => (
        <Form >
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

          <div className="">
            <div className="">
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
            </div>

            <div className="">
              <div className="field">
                <label htmlFor="email" className="label">
                  Correo
                </label>
                <div className="control">
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
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <div className="field">
                <label htmlFor="number" className="label">
                  Numero de teléfono
                </label>
                <div className="control">
                  <Field id="number" name="number" type="input" className="input" />
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
          <div className="mt-4 is-flex is-justify-content-flex-end">
            <button
              className={`button is-success ${
                isSubmitting ? "is-loading" : ""
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
