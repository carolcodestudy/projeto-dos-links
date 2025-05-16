import { FormEvent, useState, useEffect } from 'react'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { FiTrash } from 'react-icons/fi'
import {db} from '../../service/firebaseConnection'
import { doc, addDoc, deleteDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore'

//Só pode ser criada se o forEach já tiver sido riado com os campos
interface InfoProps{
    id :  string,
    name : string,
    address : string,
    bg : string,
    color_text : string,               
}

const Admin = ( ) =>{

    const [link, setLink] = useState("")
    const [url, setURL] = useState("")
    const [background, setBackground] = useState("#FFF")
    const [color_text, setColor_Text] = useState("#000")
    //Array de objetos
    const [saved_link, setSavedLink] = useState<InfoProps[]>([])

    const onFormSubmit = (e: FormEvent) =>{
        e.preventDefault()

        //Se os campos não forem vazios
        if( link !== "" || url !== ""){
            //Cria uma coleção. link é o nome da coleção. Não foi passada o documento então o banco gerou um nome com caracteres aleatórios
            addDoc(collection(db, "Link"), {
                //Passa os campos e os valores a serem adicionados
                name : link,
                address : url,
                bg : background,
                color_text : color_text,
                created : new Date()
            })
            .then(() =>{
                console.log("Cadastrado!");
                setLink("")
                setURL("")
            })
            .catch((err) =>{
                console.log("Não cadastrado! Erro: " , err);
                
            })
        }
    }
    //Renderização quando a busca pelos dados forem feitos
    useEffect( ()=>{
        
        const my_collection = collection(db, "Link")
        //Busca, passa os dados da collection e pesquisa por oredem crescente da coluna created(a data)
        const my_query = query(my_collection, orderBy("created", 'asc'))
        //Atualização dos dados de forma automática
        const unsubmit = onSnapshot(my_query, (snapshot) =>{
            let info_link = [] as InfoProps[]
            snapshot.forEach((doc)=>{
                //Só funciona se todos os campos da interface já estiverem preenchidos aqui!
                info_link.push({
                    id : doc.id,
                    name : doc.data().name,
                    address : doc.data().address,
                    bg : doc.data().bg,
                    color_text : doc.data().color_text
                })
            })
             setSavedLink(info_link)
        })

       return () =>{
        //Faz a atualização automática parar. Quando muda de pág
        unsubmit();
       }

    }, [] )

    //Função de deletar o link
    const delet = async (id  :  string) =>{
        //Configurações da coleção. Busca o banco, a coleção e o item especifico a ser deletado
        const my_collection = doc(db , "Link", id)//doc(banco_de_dados, nome_da_colecao, id_do_documento)
        //Deleta
       await deleteDoc(my_collection)
    }

    //Parte do HTML
    return(
        <div className='flex items-center flex-col min-h-screen pb-7 px-2'>
            <Header/>

            <form className='flex flex-col mt-8 mb-3 w-full max-w-xl' onSubmit={onFormSubmit}>
                <label htmlFor="text" className='text-white font-medium mt-2 mb-3'>Nome do Link</label>
                <Input type='text' id='link' placeholder='Digite o link...' value={link} onChange={(e) =>{setLink(e.target.value)}}/>

                <label htmlFor="url" className='text-white font-medium mt-2 mb-3'>URL do Link...</label>
                <Input type='link' id='url' placeholder='Digite a URL...' value={url} onChange={(e) =>{setURL(e.target.value)}}/>

                <section className='flex my-4 gap-5'>
                <div className='flex gap-2'>
                    <label htmlFor="backgrund" className='text-white font-medium mt-2 mb-2'>Fundo do link</label>
                    <Input id='backgrund' type='color' value={background} onChange={(e) => setBackground(e.target.value)}/>
                </div>

                <div className='flex gap-2'>
                    <label htmlFor="text" className='text-white font-medium mt-2 mb-2'>Texto do link</label>
                    <Input id='text' type='color' value={color_text} onChange={(e) => setColor_Text(e.target.value)}/>
                </div>
            </section>

            { link !== "" && (
                <div className='flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md'>
                <label htmlFor="text" className='text-white font-medium mt-2 mb-2'>Personalização do link:</label>
                <article className='w-111/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3' style={{ marginBottom: 8, marginTop: 8, backgroundColor: background }}>
                    <p style={{ color: color_text }}>{link}</p>
                </article>
            </div>
            ) }

            <button type='submit' className='mb-7 pt-1.5 bg-blue-600 h-9 rounded-md font-medium text-white gap-4 flex justify-center'>Salvar</button>

            <h2 className='font-bold text-white mb-4 text-2xl'>Meus links</h2>

            {saved_link.map((item) => (
             <article className='flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none' style={{backgroundColor : item.bg, color: item.color_text}} key={item.id}>
                <p>{item.name}</p>
                <div>
                 <button className='border border-dashed p-1 rounded bg-neutral-900' onClick={() => delet(item.id)}> <FiTrash size={18} color='#FFF'/> </button>
                </div>
            </article>
            ) )}
            </form>
        </div>
    )
}

export { Admin }