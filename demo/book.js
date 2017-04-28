import React from 'react';

export default function (props) {
    const { title, authors, imageLinks } = props.book.volumeInfo;
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
            </div>
        </article>
    );
}
