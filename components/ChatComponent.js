import React, { useEffect, useState } from 'react';
import { StyledChatComponent } from './ChatComponent.styled';
import EnterUsername from './EnterUsername';
const fetcher = (url) => fetch(url).then((res) => res.json())

const ChatComponent = ({name, user}) => {

  let inputBox = null;
  let messageEnd = null;

  console.log(name)
  if (!name) {
    name = 'AIN'
    console.log('name undefined. use default name AIN')
  }
  if (!user) {
    user = 'kmh'
    console.log('name undefined. use default name kmh')
  }
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState(
    [{user: name,
      message: `Hi ${user}, my name is ${name}. How may I help you?`}]);
  const messageTextIsEmpty = messageText.trim().length === 0;
/*
  const { historyMessages, error } = useSwr('/api/getHistory', fetcher)
  console.log('error', error)
  console.log('[history]', historyMessages)
  setMessages(historyMessages);
*/
  const sendChatMessage = (messageText) => {
    var time = Date.now()
    console.log(time)
    let newMessage = {user: "you", message: messageText}
    setMessages(previousState => [...previousState, newMessage])
    setMessageText("");
    fetch(`/api/sendChat?name=${name}&user=${user}&message=${messageText}&time=${time}`).then(() => {
      var getMessage = () => {
        fetch(`/api/getMessage?name=${name}&user=${user}&time=${time}`).then((result) => result.json()).then((data) => {
          console.log("data", data)
          if (data.response) {
            console.log("response", data.response)
            let response = {user: name, message: data.response}
            setMessages(previousState => [...previousState, response])
            clearInterval(intervalId);
          }
        })
      }
      var intervalId = setInterval(getMessage, 1000);
      setTimeout(() => { clearInterval(intervalId); }, 30000);
    })
    inputBox.focus();
  }

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  }

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  }

  const messages = receivedMessages.map((message, index) => {
    let color = "message_color"
    if (message.user == name) {
      color = "message_color_ain"
    }
    console.log(color)
    return <span key={index} className={["message", color].join(' ')} data-author={message.user}>{message.message}</span>;
  });

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });
  return (
    <StyledChatComponent className="chatHolder">
      <div className="chatText">
        {messages}
        <div ref={(element) => { messageEnd = element; }}></div>
      </div>
      <form onSubmit={handleFormSubmission} className="form">
          <textarea
            ref={(element) => { inputBox = element; }}
            value={messageText}
            placeholder="Type a message..."
            onChange={e => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="textarea"
          ></textarea>
          <button type="submit" className="button" disabled={messageTextIsEmpty}>
            <img src="/send.svg" aria-hidden="true" />
          </button>
      </form>
    </StyledChatComponent>
  )
}

export default ChatComponent;
