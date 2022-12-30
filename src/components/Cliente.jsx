import { useNavigate, Form, redirect } from "react-router-dom"
import { eliminarCliente } from "../../data/clientes"


export async function action ({params}) {
    await eliminarCliente(params.clienteId)
    return redirect('/')
}


const Cliente = ({cliente}) => {

    const {nombre, empresa, email, telefono, notas ,id } = cliente
    const navegate = useNavigate()


    return (
        <tr className="border-b space-y-2">
            <td className=" p-6">
                <p className="text-2xl text-gray-800">{nombre}</p>
                <p className=" uppercase text-cyan-600 font-bold">{empresa}</p>
            </td>

            <td className="p-6">
                <p className=" text-gray-600"><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
                <p className=" text-gray-600"><span className="text-gray-800 uppercase font-bold">Telefono: </span>{telefono}</p>
                <p className=" text-gray-600"><span className="text-gray-800 uppercase font-bold">Nota: </span>{notas}</p>
            </td>

            <td className="p-6 flex gap-3">
                <button onClick={() => navegate(`/clientes/${id}/editar`)} type="button" className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs">
                    Editar
                </button>
                
                <Form
                 method="post"
                 action={`/clientes/${id}/eliminar`}
                 onSubmit={(e) => {
                    if(!confirm('¿Deseas eliminar este registro?')) {
                        e.preventDefault()   
                    }
                 }}>
                    <button type="submit" className="text-red-600 hover:text-red-700 uppercase font-bold text-xs">
                        Eliminar
                    </button>
                </Form>

            </td>   
        </tr>
    )
}

export default Cliente