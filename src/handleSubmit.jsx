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
    try {
        const response = await axios.post(
            "https://webmicfx.arashi.solutions/FGR/WsAjaxCoClien", 
            JSON.stringify(values), // Convertir a JSON
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                mode: "cors" // Asegurar que la solicitud use CORS

                
            }
        );

        console.log("Datos guardados:", response.data);
        setSuccess(true);
        formikProps.resetForm();
        recaptchaRef.current.reset();
        
    } catch (error) {
        console.error("Error al guardar los datos:", error);
    } finally {
        setIsSubmitting(false);
    }
};

