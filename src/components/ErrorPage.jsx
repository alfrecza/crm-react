import { useRouteError } from "react-router-dom"

export default function ErrorPage (){
    const error = useRouteError()

    return(
        <div  className=" space-y-8">
            <h1 className=" text-center text-6xl font-extrabold mt-20 text-blue-900">CRM - Clientes</h1>
            <h2 className=" text-center text-6xl font-extrabold mt-20 text-red-900">(Error)</h2>
            <p className="text-center text-lg">{error.statusText || error.text}</p>
        </div>
    )
}