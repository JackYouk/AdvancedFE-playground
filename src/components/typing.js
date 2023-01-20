import ReactTypingEffect from 'react-typing-effect';

const Typing = (props) => {
    

    return (
        <>
        <ReactTypingEffect
            text={props.text}
            className={props.cssName}
            typingDelay={800}
        />
        </>
    );
}

export default Typing;