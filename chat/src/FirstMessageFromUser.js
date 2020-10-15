import React from 'react';
import useDocWithCache from './useDocWithCache';
import formatDate from 'date-fns/format';

function FirstMessageFromUser({ message, showDay }) {
    const author = useDocWithCache(message.user.path);

    return (
        <div key={message.id}>
            { showDay && (
                <div className="Day">
                <div className="DayLine" />
                <div className="DayText">
                    {new Date(message.createdAt.seconds * 1000).toLocaleDateString()}
                </div>
                <div className="DayLine" />
                </div>  
            ) }
            <div className="Message with-avatar">
                <div className="Avatar" style={{
                    backgroundImage: author
                        ? `url("${author.photoUrl}")`
                        : ""
                }} />
                <div className="Author">
                <div>
                    <span className="UserName">{author && author.displayName}</span>
                    {" "}
                    <span className="TimeStamp">{formatDate(message.createdAt.seconds * 1000, "H:mm")}</span>
                </div>
                <div className="MessageContent">{message.text}</div>
                </div>
            </div>
        </div>
    )
}

export default FirstMessageFromUser;