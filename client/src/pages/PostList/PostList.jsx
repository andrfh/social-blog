import './PostList.css'
import Header from '../../components/Header/Header'
import Post from '../../components/Post/Post'
import story from '../../assets/story.svg'
import send from '../../assets/send.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function PostList() {
    let navigate = useNavigate();
    const [posts, setPosts] = useState()

    useEffect(() => {
        let token = localStorage.getItem('t');
        if (!token) {
            navigate("/")
        }
        axios.get(`${__API_ROOT__}/api/posts`, {headers: {Authorization: `Bearer ${token}`}}).then((resp) => { 
            setPosts(resp.data)
        }).catch((error => {
            if (error.status === 401 || 403 ) {
                navigate("/")
            }
        }))

    }, []);


    return (
        <div className="home">
            <Header active='posts' />
            <main className='main'>
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

export default PostList
