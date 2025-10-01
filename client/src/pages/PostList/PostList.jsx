import './PostList.css'
import Header from '../../components/Header/Header'
import Post from '../../components/Post/Post'
import story from '../../assets/story.svg'
import send from '../../assets/send.svg'
import axios from 'axios';
import { useState, useEffect } from 'react'

function PostList() {
    const [posts, setPosts] = useState()
    useEffect(() => {
        axios.get(`${__API_ROOT__}/api/posts`).then((resp) => { 
            setPosts(resp.data)
        });
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
