import './PostPage.css'
import Header from '../../components/Header/Header'
import Post from '../../components/Post/Post'
import axios from 'axios';
import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react'



function PostPage() {
    const { post_id } = useParams();
    const [visible, setVisible] = useState(false)
    const [postData, setPostData] = useState()

    useEffect(() => {
        let token = localStorage.getItem('t');
        if (!token) {
            navigate("/")
        }
        axios.get(`${__API_ROOT__}/api/posts/${post_id}`, {headers: {Authorization: `Bearer ${token}`}}).then((resp) => { 
            setPostData(resp.data)
        }).catch((error => {
            if (error.status === 401 || 403 ) {
                navigate("/")
            }
        }))

    }, []);

    return (
        <div className="home">
            <Header active='home' />
            <main className='main'>
                <div className="post_wrapper">
                    {postData ? 
                    <Post picture={postData.picture} title={postData.title} content={postData.content} uuid={postData._id}/>
                    : <></>}
                </div>
            </main>
        </div>
    )
}

export default PostPage
