import ReactTypingEffect from 'react-typing-effect';

const Typing = () => {
    

    return (
        <>
        <ReactTypingEffect
            text={["JackJack Labs"]}
            className='name'
            typingDelay={800}
        />
        </>
    );
}

export default Typing;