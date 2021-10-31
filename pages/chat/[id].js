import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from "../../layouts"
import ChatHome from "../../components/ChatHome"

const Chat = () => {
  const router = useRouter()
  const { id } = router.query
  if (id) {
    return (
      <Layout>
        <ChatHome name={id} />
      </Layout>
    )
  } else {
    return (
      <Layout>
        loading ...
      </Layout>
    )
  }
}

export default Chat
