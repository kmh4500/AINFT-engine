import React from "react"
import Layout from "../layouts"
import ChatHome from "../components/ChatHome"

export default function Page () {
  // If session exists, display content
  return (
    <Layout>
      <ChatHome name="AIN" />
    </Layout>
  )
}
