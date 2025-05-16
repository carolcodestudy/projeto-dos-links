import {Social} from '../../components/Social'
import { FaFacebook, FaInstagram,  FaPinterest } from 'react-icons/fa'
import { getDocs, doc, collection, orderBy,query, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../service/firebaseConnection'

interface InfoProps{
    id :  string,
    name : string,
    address : string,
    bg : string,
    color_text : string,               
}

interface SocialProps{
    facebook : string,
    instagram : string,
    pinterest : string
}

const Home = ( ) =>{

    const [list, setList] = useState<InfoProps[]>([])
    const [social_media, setSocialMedia] = useState<SocialProps>()

useEffect(()=>{
    const my_collection = collection(db, "Link")
    const my_query = query(my_collection, orderBy("created" , "asc"))

    //Usar o getDocs para buscar a lista que são os dados
    getDocs(my_query)
    .then((snapshot)=>{
        let dates = [] as InfoProps[]
        snapshot.forEach((item)=>{
            dates.push({
                //Quando usei item.data().id o id ficou indefinido
                id : item.id,  
                name : item.data().name,
                address : item.data().address,
                bg : item.data().bg,
                color_text : item.data().color_text
            })
        })
        setList(dates)  
        console.log(dates);
    })
},[])

useEffect(()=>{
    //Por ser uma Effect que recebe dados tem que por dentro da função
    function toSocialMedia (){
        const my_coll_doc = doc(db, "social", "address")
        getDoc(my_coll_doc)
        .then((snapshot)=>{
            const dates = snapshot.data()
            if(dates !== undefined){
                //Se as informações estiverem definidas irá atribuir os links nos icones
                setSocialMedia({
                    facebook : dates?.facebook,
                    instagram : dates?.instagram,
                    pinterest : dates?.pinterest
                })
            }
        })
    }
    toSocialMedia()
} , [])

    return(
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white text-shadow-blue-100 mt-20">Ana Carolina</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>
            <nav className="flex flex-xol w-11/12 max-w-xl">
                
            <div className='w-full'>
                {
                list.map((item) =>(
                        <section key={item.id} style={{ backgroundColor : item.bg }} className="bg-white mb-4 w-full py-2 rounded-lg select-none transition:transform hover:scale-105 cursor-pointer">
                            <a href={item.address} target='_blank'>
                                <p className="text-base text-center md:text-lg" style={{ color : item.color_text }}>{item.name}</p>
                            </a>
                        </section>
                ))
                }
            </div>
            
            </nav>
            
            {social_media && Object.keys(social_media).length > 0 &&(
                <footer className="flex justify-center gap-3 my-4">
            <Social url={social_media?.facebook}>
                <FaFacebook size={35} color='#FFF'/>
            </Social>
            <Social url={social_media?.instagram}>
                <FaInstagram size={35} color='#FFF'/>
            </Social>
            <Social url={social_media?.pinterest}>
                <FaPinterest size={35} color='#FFF'/>
            </Social>
            </footer>
            )}
        </div>
    )
}

export { Home }