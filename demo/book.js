import React from 'react';

export default function (props) {
    const { title, authors, imageLinks } = props.book.volumeInfo;
    const textSnippet = props.book.searchInfo && props.book.searchInfo.textSnippet;
    return (
        <article className='book'>
            { imageLinks && (
                <div className='book-image'>
                    <img src={ imageLinks.thumbnail } alt={ title } />
                </div>
            )}
            <div className='book-details'>
                <h3 className='book-title'>{ title }</h3>
                { authors && (
                    <div className='book-authors'>
                        Authors: { authors.join(', ') }
                    </div>
                )}
                { textSnippet && (
                    <div className='book-description' dangerouslySetInnerHTML={{ __html: textSnippet }}></div>
                )}
            </div>
        </article>
    );
}
