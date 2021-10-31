import ChatComponent from '../ChatComponent'
import EnterUsername from '../EnterUsername'
import React, {useState} from "react"

export default function ChatHome ({name}) {
  const [user, setUser] = useState("")
  if (!user) {
    return (<EnterUsername setUser={setUser} />)
  }
  return (
    <main>
      <h1 className="title">Chat with {name}</h1>
      <ChatComponent name={name} user={user} />
    </main>
  )
}
