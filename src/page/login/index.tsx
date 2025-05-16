import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import{ Input } from '../../components/Input'
import { auth } from '../../service/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = ( ) =>{

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate()

    const onSubmitForm = (e : FormEvent) =>{
        e.preventDefault()

        if(email === "" || pass === ""){
            alert("Campos não preenchidos.")
            return
        }
        else{
            signInWithEmailAndPassword(auth, email, pass)
            .then( ()=>{
                //replace substitui o histórioco de navegação
                navigate("/admin" , {replace:true})
            } )
            .catch((err) =>{
                console.log("Acesso negado: " , err);
                //Deu erro 400 Credencial inválida
            })
        }
    }

    return(
        <div className='flex w-full h-screen items-center justify-center flex-col'>
            <Link to={'/'}>
                <h1 className='mt-11 text-white mb-7 font-bold text-5xl'>Profe<span className='bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent'>ssional</span></h1>
            </Link>

            <form className='w-full max-w-xl flex flex-col px-2' onSubmit={onSubmitForm}>
                <Input type='email' placeholder='Digite o seu e-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <Input type='password' placeholder='****' value={pass} onChange={(e) => setPass(e.target.value)}/>
                <button type='submit' className='h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white cursor-pointer'>Acessar</button>
            </form>
        </div>
    )
}

export { Login }