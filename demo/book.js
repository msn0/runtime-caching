import React from 'react';

export default function (props) {
    const { title, authors, imageLinks } = props.book.volumeInfo;
    return (
        <div>
            <h3>{ title }</h3>
            {authors && (
                <div>
                    Authors: { authors.join(', ') }
                </div>
            )}
            {imageLinks && (
                <img src={ imageLinks.thumbnail } alt={ title } />
            )}
        </div>
    );
}
