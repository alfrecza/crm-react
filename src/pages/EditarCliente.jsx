import { obtenerCliente } from "../../data/clientes"
import Formulario from "../components/Formulario"
import { Form, useActionData, useLoaderData, redirect } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { actualizarCliente } from "../../data/clientes"
import Error from "../components/Error"

export async function loader ({params}) {

    const cliente = await obtenerCliente(params.clienteId)

    if(Object.values(cliente).length === 0 ) {
        throw new Response('', {status:404, statusText: 'No se encontro el cliente'})
    }

    return cliente
}


export async function action ({request, params}) {
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    
    //Validacion

    const errores = []

    if(Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios')
    }

    //Retorna los datos si es que hay errores
    
    if(Object.keys(errores).length){
        return errores
    }


    await actualizarCliente(params.clienteId, datos)

    return  redirect('/') 
}



const EditarCliente = () => {

    const navegate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()    


    return(
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
            <p className=" mt-3">A continuacion podras modificar los datos del cliente</p>   
            
            <div className="flex justify-end ">
                <button onClick={() => navegate(-1)} className="bg-blue-800 text-white px-3 py-1 font-bold uppercase">Volver</button>
            </div>

            <div className=' bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

                {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

                <Form method='post' noValidate >
                    
                    <Formulario
                        cliente={cliente}
                    />

                    <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer' value='Guardar cambios'/>

                </Form>

            </div>

            
        </>
    )

}


export default EditarCliente