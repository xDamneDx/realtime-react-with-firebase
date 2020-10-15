import React from 'react';
import FirstMessageFromUser from './FirstMessageFromUser';
import ChatScroller from './ChatScroller';
import useCollection from './useCollection';
import isSameDay from 'date-fns/isSameDay';

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, 'createdAt');

  return (
    <ChatScroller className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages && messages.map((message, index) => {
        const previous = messages[index - 1];
        const showAvatar = shouldShowAvatar(previous, message);
        const showDay = shouldShowDay(previous, message);

        return showAvatar ? (
          <FirstMessageFromUser message={message} showDay={showDay} key={message.id} />
        ) : (
          <div key={message.id}>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        )
      })}
    </ChatScroller>
  );
}

function shouldShowAvatar(previous, message) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const differentUser = message.user.id !== previous.user.id;
  if (differentUser) {
    return true;
  }

  const hasBeenAwhile = message.createdAt.seconds - previous.createdAt.seconds > 180;
  return hasBeenAwhile;
}

function shouldShowDay(previous, message) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const isNewDay = !isSameDay(
    previous.createdAt.seconds * 1000,
    message.createdAt.seconds * 1000
  )
  return isNewDay;
}

export default Messages;
