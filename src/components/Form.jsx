import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { use, useEffect, useRef, useState } from "react";
import { handleSubmit } from "../handleSubmit";
import ReCAPTCHA from "react-google-recaptcha";


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const FormQuoteSchema = yup.object().shape({
  NOM_1ENTE: yup.string().required("Debe ingresar su nombre."),
  NOM_2ENTE: yup.string().required("Debe ingresar su nombre."),
  NUM_TELEN1: yup.string().matches(phoneRegExp, 'Número de teléfono no válido').required('Debe ingresar un número de teléfono.').min(10, "too short")
    .max(10, "too long"),
  //quantity: yup.number().moreThan(0).required("Debe especificar la cantidad."),
  //deliveryType: yup.string().required("Debe elegir un tipo de entrega"),
  FEC_NAENT: yup.date().required("Debe ingresar su fecha de nacimiento."),
  tyc: yup.boolean().oneOf([true], "Debe aceptar los términos y condiciones."),
  recaptcha: yup.string().required("Debe verificar el CAPTCHA."),
  //recaptcha: yup.string().required("Debe verificar el CAPTCHA.")
});

export const FormQuote = () => {
  const [success, setSuccess] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const recaptchaRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (recaptchaRef.current?.getValue() === null) {
        setCaptchaError(true);
        setIsSubmitting(false); // Evitar que el botón quede en estado de carga
      }
    }, 5000);
    return () => clearInterval(interval);
    }, []);


  return (
    <Formik
      initialValues={{
        NOM_1ENTE: "",
        NOM_2ENTE: "",
        NUM_TELEN1: "",
        //quantity: "",
        //deliveryType: "",
        FEC_NAENT: "",
        tyc: false,
        recaptcha: "",
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
        if (!recaptchaRef.current?.getValue()) {
          setCaptchaError(true);
          setIsSubmitting(false);
          return;
        }
        setIsSubmitting(true);
        console.log("Valores enviados:", values); // Agregar esta línea para depurar
        handleSubmit(values, formikProps, setSuccess, setIsSubmitting, recaptchaRef);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
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
              <label htmlFor="NOM_1ENTE" className="label">
                Nombre 1
              </label>
              <div className="control">
                <Field id="NOM_1ENTE" name="NOM_1ENTE" type="input" className="input" />
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
              {touched.NOM_1ENTE && errors.NOM_1ENTE && (
                <p className="help is-danger">{errors.NOM_1ENTE}</p>
              )}
            </div>
            
            <div className="field">
              <label htmlFor="NOM_2ENTE" className="label">
                Nombre 2
              </label>
              <div className="control">
                <Field id="NOM_2ENTE" name="NOM_2ENTE" type="input" className="input" />
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
              {touched.NOM_2ENTE && errors.NOM_2ENTE && (
                <p className="help is-danger">{errors.NOM_2ENTE}</p>
              )}
            </div>

              <div className="field">
                <label htmlFor="NUM_TELEN1" className="label">
                  Numero de teléfono
                </label>
                <div className="control">
                  <Field id="NUM_TELEN1" name="NUM_TELEN1" type="input" className="input " />
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
                {touched.NUM_TELEN1 && errors.NUM_TELEN1 && (
                  <p className="help is-danger">{errors.NUM_TELEN1}</p>
                )}
              </div>
              


              <div className="field ">
                <label htmlFor="FEC_NAENT" className="label">
                  Fecha de nacimiento
                </label>
                <div className="control">
                  <Field
                    id="FEC_NAENT"
                    name="FEC_NAENT"
                    type="date"
                    className="input "
                    max={new Date().toISOString().split("T")[0]} // Restringe fechas futuras
                    onFocus={(e) => e.target.showPicker && e.target.showPicker()} // Abre el selector al hacer clic
                  />
                </div>
                {touched.FEC_NAENT && errors.FEC_NAENT && (
                  <p className="help is-danger">{errors.FEC_NAENT}</p>
                )}
              </div>


          </div>


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
          {/* <div className="is-flex is-justify-content-center mt-4">
         
                <ReCAPTCHA
                    sitekey="6Lc-pvEqAAAAAMljUFGofBPeAmo07F2GFYUDiyVE"
                    onChange={handleRecaptchaChange}
                />



            
          </div> */}
          {/* {captchaError && <p className="help is-danger">Debe verificar el CAPTCHA.</p>} */}

          {/* <Field name="recaptcha">
          {({ field, form }) => (
            <>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lc-pvEqAAAAAMljUFGofBPeAmo07F2GFYUDiyVE"
                onChange={(value) => {
                  setCaptchaError(false);
                }}
                onExpired={() => {
                  setCaptchaError(true);
                  setIsSubmitting(false);
                }}
              />
              {form.touched.recaptcha && form.errors.recaptcha && (
                <p className="help is-danger">{form.errors.recaptcha}</p>
              )}
            </>
          )}
        </Field>  */}


          {/* <div className="is-flex is-justify-content-center mt-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Lc-pvEqAAAAAMljUFGofBPeAmo07F2GFYUDiyVE"
              onChange={(value) => {
                setCaptchaError(false);
              }}
              onExpired={() => {
                setCaptchaError(true);
                setIsSubmitting(false);
              }}
            />
            {captchaError && <p className="help is-danger">Debe verificar el CAPTCHA.</p>} 
            
          </div> */}

          <Field name="recaptcha">
            {({ form }) => (
              <div className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center mt-4">
                <div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Lc-pvEqAAAAAMljUFGofBPeAmo07F2GFYUDiyVE"
                    onChange={(value) => {
                      form.setFieldValue("recaptcha", value);
                      setCaptchaError(false);
                    }}
                    onExpired={() => {
                      form.setFieldValue("recaptcha", "");
                      setCaptchaError(true);
                      setIsSubmitting(false);
                    }}
                  />

                </div>
                
                {(captchaError || (form.touched.recaptcha && form.errors.recaptcha)) && (
                    <p className="help is-danger">Debe verificar el CAPTCHA.</p>
                )}
              </div>
            )}
          </Field>          

          <div className="mt-4 is-flex is-justify-content-flex-end">
            <button
              className={`button is-success ${isSubmitting ? "is-loading" : ""
                }`.trim()}
              type="submit"
              //disabled={isSubmitting}
            >
              Aceptar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
