import { Link } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'

//Configuação do banco
import { auth } from '../../service/firebaseConnection'
//Função do Firebase que faz deslogar
import { signOut } from 'firebase/auth'

const Header = () =>{

    //Promise, faz requisição no banco
    async function toLogOut() {
        //Espera o processo de deslogar
        await signOut(auth)
    }

    return(
        <header className='w-full max-w-2xl mt-4 px-1'>
            <nav className='w-full bg-white h-12 flex items-center justify-evenly rounded-md px-3'>
                <div className='flex gap-4 font-medium'>
                 <Link to={'/'}>
                 Home
                 </Link>
                 <Link to={'/admin'}>
                 Links
                 </Link>
                 <Link to={'/admin/network'}>
                 Redes sociais
                 </Link>
                </div>
                <button type="submit" onClick={toLogOut}><BiLogOut size={28} color='#db2629'/></button>
            </nav>
        </header>
    )
}

export {Header}