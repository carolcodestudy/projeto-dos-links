import { FormEvent, useEffect, useState } from 'react'
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { db } from '../../service/firebaseConnection'
import { setDoc, doc, getDoc } from 'firebase/firestore'

const Network = ( ) =>{

    const [url_fb, setURLFb] = useState("")
    const [url_i, setURLI] = useState("")
    const [url_pi, setURLPi] = useState("")

    const onSubmitForm = (e: FormEvent) =>{
        e.preventDefault()
        setDoc(doc(db, "social", "address"), {
            facebook : url_fb,
            instagram : url_i,
            pinterest : url_pi
        })
        .then(()=>{
            console.log("FOI!");
        })
        .catch((err) =>{
            console.log("Ñ FOI, ERRO: " , err);
        })
    }

    useEffect(()=>{
        const my_coll_doc = doc(db, "social", "address")
        getDoc(my_coll_doc)
        .then((snapshot) =>{
            let dates = snapshot.data()
            if(dates !== undefined){
                setURLFb(dates?.facebook)
                setURLI(dates?.instagram)
                setURLPi(dates?.pinterest)
            }
        })

        //Não criei função e funcionou mesmo assim.
    }, [])

    return(
        <div className="flex flex-col items-center  min-h-screen pb-7 px-2">
            <Header/>
            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>

            <form className='flex flex-col max-w-xl w-full' onSubmit={onSubmitForm}>
                <label htmlFor="input-facebook" className='text-white font-medium mt-2 mb-2'>Link do Facebook</label>
                <Input id="input-facebook" type="url" placeholder="Digite o endereço do Facebook" value={url_fb} onChange={(e) => setURLFb(e.target.value)}
                />

                <label htmlFor="input-instagram" className='text-white font-medium mt-2 mb-2'>Link do Instagram</label>
                <Input id="input-instagram" type="url" placeholder="Digite o endereço do Instagram" value={url_i} onChange={(e) => setURLI(e.target.value)}
                />

                <label htmlFor="input-pinterest" className='text-white font-medium mt-2 mb-2'>Link do Pinterest</label>
                <Input id="input-pinterest" type="url" placeholder="Digite o endereço do Pinterest" value={url_pi} onChange={(e) => setURLPi(e.target.value)}
                />

                <button type="submit" className='text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium' >Salvar</button>
            </form>
        </div>
    )
}

export { Network }