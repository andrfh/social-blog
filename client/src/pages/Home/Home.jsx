import './Home.css'
import Header from '../../components/Header/Header'
import Post from '../../components/Post/Post'
import story from '../../assets/story.svg'
import send from '../../assets/send.svg'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../../components/Modal/Modal'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

function Home() {
    let navigate = useNavigate();
    const [visible, setVisible] = useState(false)
    const [posts, setPosts] = useState()
    const [postData, setPostData] = useState({file: "", title: "", subtitle: "", content: "", });
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        let token = localStorage.getItem('t');
        if (!token) {
            navigate("/")
        }
        axios.get(`${__API_ROOT__}/api/posts`, {headers: {Authorization: `Bearer ${token}`}}).then((resp) => { 
            const sorted = resp.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPosts(sorted);
        }).catch((error => {
            if (error.status === 401 || 403 ) {
                navigate("/")
            }
        }))

    }, []);

    const onChangePost = (event) => {
        const { name, value, files } = event.target;
        if (name === "file") {
            const file = files[0];
            setPostData((prev) => ({ ...prev, file }));
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setPreview(imageUrl);
            } else {
                setPreview(null);
            }
        } else {
            setPostData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const onAddPost = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("t");
        if (!token) return navigate("/");

        const formData = new FormData();
        formData.append("picture", postData.file);
        formData.append("title", postData.title);
        formData.append("subtitle", postData.subtitle);
        formData.append("content", postData.content);

        try {
            const resp = await axios.post(
                `${__API_ROOT__}/api/posts`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            setVisible(false);
            setPosts((prev) => [resp.data, ...(prev || [])]);
        } catch (error) {
            if (error.status === 401 || 403 ) {
                navigate("/")
            }
        }
    };

    return (
        <div className="home">
            <Header active='home' />
            <main className='main'>
                <button className='new_post' onClick={() => {setVisible(true)}}>Добавить пост +</button>
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
            <Modal title='Добавьте новый пост' visible={visible} onClose={()=>{setVisible(false)}} >
                <form className='modal_form' method='post' onSubmit={onAddPost}>
                    <div className="file-input">
                        <input name="file" type="file" id="file" className="file" onChange={onChangePost} accept="image/*" hidden/>
                        <label
                            htmlFor="file"
                            style={{
                                backgroundImage: preview ? `url(${preview})` : "none",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                color: preview ? "transparent" : "#fff",
                            }}
                        >
                            {preview ? "" : "Выберите изображение"}
                        </label>
                    </div>
                    <input name='title' placeholder='Заголовок поста' type="text" onChange={onChangePost} />
                    <input name='subtitle' placeholder='Описание поста (подзаголовок)' type="text" onChange={onChangePost}/>
                    <textarea name='content' placeholder='Напишите здесь текст поста' type="text"  onChange={onChangePost}/>
                    <Button text='Отправить' type='submit'/>
                </form>
            </Modal>
        </div>
    )
}

export default Home
