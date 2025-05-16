import { ReactNode, useState, useEffect } from "react"
import { auth } from '../service/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

interface ControllProps{
    children : ReactNode
}

const Controller = ( {children} : ControllProps ) =>{

    const [isLoading, setLoading] = useState(true)
    const [isSigned, setSigned] = useState(false)

    useEffect(() =>{
        const unsubmit = onAuthStateChanged(auth, (user)=>{
            //Se o usuário estiver logdo
            if(user){
                const userData ={
                    uid : user?.uid,
                    email : user?.email
                }

                localStorage.setItem("@myKey" , JSON.stringify(userData))

                //logado
                setLoading(false)
                setSigned(true)
            }
            else{
                //Quando acessei diretamente pelaa rota /admin em outro navegador que n loguei exibe a mensagem "nada!"

                //Não logado
                setLoading(false)
                setSigned(false)
            }
        })

        //Para não ficar rodando sempre o observador ou o listener da função com auth. Pois o usuário saiu da rota Controller
        return () =>{
            unsubmit()
        }
    }, [])

    //Se estiver logado
    if(isLoading){
        return <></>
    }
    if(!isSigned){
        return <Navigate to="/login"/>
    }

return children
}

export {Controller}