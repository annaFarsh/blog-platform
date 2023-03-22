function NewArticle(){
    return (
        <div className='new-article'>
            <div className='new-article__h1'>
                <label className='new-article__title'>Title
                    <input type='text' />
                </label>
                <label className='new-article__description'>Short description
                    <input type='text' />
                </label>
                <label className='new-article__text'>Short description
                    <textarea></textarea>
                </label>
                <label className='new-article__tags'>Tags
                    <div className='new-article__tag'>
                        <input type='text' />
                        <button className='button new-article__button button--delete'></button>
                        <button className='button new-article__button button--add'></button>
                    </div>
                    <div className='new-article__tag'>
                        <input type='text' />
                        <button className='button new-article__button button--delete'></button>
                        <button className='button new-article__button button--add'></button>
                    </div>
                </label>
                <div>
                    <input
                        className="button new-article__button button--send"
                        type="submit"
                    />
                </div>
            </div>
            </div>
    )
}
export default NewArticle;