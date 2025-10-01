import './PostPage.css'
import Header from '../../components/Header/Header'
import Post from '../../components/Post/Post'
import story from '../../assets/story.svg'
import send from '../../assets/send.svg'
import axios from 'axios';
import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react'

function PostPage() {
    const { post_id } = useParams();

    const [postData, setPostData] = useState()
    useEffect(() => {
        axios.get(`${__API_ROOT__}/api/posts/${post_id}`).then((resp) => { 
            setPostData(resp.data)
        });
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
