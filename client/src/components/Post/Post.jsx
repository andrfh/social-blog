import './Post.css'

function Post({picture, title, content, uuid}) {
  return (
    <div className="post">
        <img src={__API_ROOT__ +"/"+ picture} alt="" />
        <div className="post_data">
            <h3>{title}</h3>
            <p>{content}</p>
            <div className="post_data-bottom">
                <div className="data_wrapper">
                    <p>21.06.2020</p>
                    <span className='circle'/>
                    <p className="tag">{uuid}</p>
                </div>
                <a href={"posts/" + uuid}>Читать</a>
            </div>
        </div>
    </div>
  )
}

export default Post
