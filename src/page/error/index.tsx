import { Link } from 'react-router-dom'

const ErrorNotFound = () =>{
    return(
        <div className='flex flex-col w-full min-h-screen justify-center items-center text-white'>
            <h1 className='font-bold text-4xl mb-4'>404</h1>
            <h2 className='font-bold text-4xl mb-4'>Página não encontrada</h2>
            <p className='italic text-1xl mb-4'>Esta página não existe.</p>
            <Link to={"/"} className='bg-gray-50/20 py-1 px-4 rounded-md'>
                Voltar para Home
            </Link>
        </div>
    )
}

export {ErrorNotFound}