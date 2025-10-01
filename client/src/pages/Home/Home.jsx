import './Home.css'
import Header from '../../components/Header/Header'
import Post from '../../components/Post/Post'
import story from '../../assets/story.svg'
import send from '../../assets/send.svg'
import axios from 'axios';
import { useState, useEffect } from 'react'

function Home() {
    const [posts, setPosts] = useState()
    useEffect(() => {
        axios.get(`${__API_ROOT__}/api/posts`).then((resp) => { 
            setPosts(resp.data)
        });
      }, []);

    return (
        <div className="home">
            <Header active='home' />
            <main className='main'>
                <div className="main_input">
                    <input type="text" placeholder='Напишите что-нибудь'/>
                    <button className='story'><img src={story} alt="" /></button>
                    <button className='send'><img src={send} alt="" /></button>
                </div>
                <div className="main_posts">
                    {posts ? 
                        posts.map((item)=> {
                            return (
                                <Post picture={item.picture} title={item.title} content={item.content} uuid={item._id}/>
                            )
                        })
                        :
                        <>Постов нет :(</>
                    }
                </div>
            </main>
        </div>
    )
}

export default Home
