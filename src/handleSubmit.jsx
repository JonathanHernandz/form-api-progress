import axios from "axios";

export const handleSubmit = async (values, formikProps, setSuccess) => {
    try {
        const response = await axios.post("http://localhost:8080/api/quotes", values);
        console.log("Datos guardados:", response.data);
        setSuccess(true);
        formikProps.resetForm();
    } catch (error) {
        console.error("Error al guardar los datos:", error);
    }
};