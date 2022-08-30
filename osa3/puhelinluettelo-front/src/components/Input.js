const Input = ({text,name, handler}) => {
    return (
        <div>
            {text}: <input value={name} onChange={handler} />
        </div>
    )
}

export default Input