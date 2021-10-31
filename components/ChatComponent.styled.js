import styled from 'styled-components';

export const StyledChatComponent = styled.div`
.chatHolder {
    display: grid;
    grid-template-rows: 1fr 100px;
    width: 360px;
}

.chatText {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 360px;
    gap: 1em;
    padding: 1em;
    height: calc(100vh - 40px - 100px - 100px - 100px);
    overflow-y: auto;
}

.form {
    position: relative;
    z-index: 0;
    width: 100%;
}

.textarea {
    padding: 8px 48px 8px 12px;
    font-size: 1.2em;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    /* grayscale/ainize gray 4 */
    border: 2px solid #ECECF3;
    border-radius: 10px;
}

.button {
   position: absolute;
   background-color: #ffffff;
    top: 0;
    right: 0;
    margin-right: 20px;
    margin-top: 13px;
    border: 0;
    height: 30px;
    width: 30px;
}

.button img {
    height: 30px;
    width: 30px;
}
.button:hover {
}

.button:disabled,
.button:hover:disabled {
    opacity: 0.5;
}

.message {
    padding: 1em;
    border-radius: 10px;
    flex-grow: 0;
    border-bottom-left-radius: 0;
    word-break: break-word;
    text-align: left;
}

.message_color {
    background-color: #C9F8FF33;
}

.message_color_ain {
    background-color: #AE8AFB33;
}
`
