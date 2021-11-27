import React from "react"
import Layout from "../layouts"
import ChatHome from "../components/ChatHome"

const NAME = "Elon"
export default function Page () {
  // If session exists, display content
  return (
    <Layout>
      <ChatHome name="Elon" />
    </Layout>
  )
}
