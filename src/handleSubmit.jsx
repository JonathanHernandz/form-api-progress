import axios from "axios";

export const handleSubmit = async (values, formikProps, setSuccess) => {
    console.log(values);
    try {
        const response = await axios.post("http://localhost:8080/api/cliente", values);
        console.log("Datos guardados:", response.data);
        setSuccess(true);
        formikProps.resetForm();
        
    } catch (error) {
        console.error("Error al guardar los datos:", error);
    }
};