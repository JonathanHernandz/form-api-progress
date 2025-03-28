// import axios from "axios";

// export const handleSubmit = async (values, formikProps, setSuccess,setIsSubmitting, recaptchaRef) => {
//     console.log(values);
//     try {
//         //const response = await axios.post("http://localhost:8080/api/cliente", values);
//         const response = await axios.post("https://webmicfx.arashi.solutions/FGR/WsAjaxCoClien", values);
//         console.log("Datos guardados:", response.data);
//         setSuccess(true);
//         formikProps.resetForm();
//         recaptchaRef.current.reset();
        
//     } catch (error) {
//         console.error("Error al guardar los datos:", error);
//     } finally{
//         setIsSubmitting(false);
//     }
// };

import axios from "axios";

export const handleSubmit = async (values, formikProps, setSuccess, setIsSubmitting, recaptchaRef) => {
    console.log(values);

    // Convertir el objeto values a una cadena HTML en formato <p>clave: valor</p>
    const htmlData = `
        <html>
            <body>
                ${Object.entries(values).map(([key, value]) => `<p>${key}: ${value}</p>`).join("")}
            </body>
        </html>
    `;

    try {
        const response = await axios.post(
            "https://webmicfx.arashi.solutions/FGR/WsAjaxCoClien", 
            htmlData, 
            {
                headers: {
                    "Content-Type": "application/html" 
                }
            }
        );

        console.log("Datos guardados:", response);
        setSuccess(true);
        formikProps.resetForm();
        recaptchaRef.current.reset();
        
    } catch (error) {
        console.error("Error al guardar los datos:", error);
    } finally {
        setIsSubmitting(false);
    }
};