import React, {useState} from "react"

export default function EnterUsername (props) {
  const [inputs, setInputs] = useState({});

  const handleFormSubmission = (event) => {
    event.preventDefault();
    props.setUser(inputs.name)
  }
  const messageTextIsEmpty = Object.keys(inputs).length < 1;

  const handleChange = e => {
    let name = e.target.name
    let value = e.target.value
    setInputs(prevState => ({ ...prevState, [name]: value }))
  };

  return (
    <>
      <h1>Enter Username</h1>
      <p>
      <form onSubmit={handleFormSubmission} className="form">
        <input className="name" type ="text"
          placeholder="Satoshi"
          name="name"
          value={inputs.name || ''} onChange={handleChange} />

        <button type="submit" className="button" disabled={messageTextIsEmpty}>
          Start
        </button>

      </form>
      </p>
    </>
  )
}
