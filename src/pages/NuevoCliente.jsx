import { data } from 'autoprefixer'
import {useNavigate, Form, useActionData, redirect} from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import { agregarCliente } from '../../data/clientes'


export async function action ({request}) {
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = datos.email

    //Validacion

    const errores = []

    if(Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios')
    }

    //Retorna los datos si es que hay errores
    
    if(Object.keys(errores).length){
        return errores
    }


    await agregarCliente(datos)

    return  redirect('/') 
}

const NuevoCliente = () => {

    const navegate = useNavigate()    
    const errores = useActionData()


    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Nuevo cliente</h1>
            <p className="mt-3 text-2xl font-bold text-blue-900">Llena todos los campos para registrar un nuevo cliente</p>   
            
            <div className="flex justify-end ">
                <button onClick={() => navegate(-1)} className="bg-blue-800 text-white px-3 py-1 font-bold uppercase">Volver</button>
            </div>

            <div className=' bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

                {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

                <Form method='post' noValidate >
                    
                    <Formulario/>

                    <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer' value='Registrar cliente'/>

                </Form>

            </div>

            
        </>
    )
}

export default NuevoCliente