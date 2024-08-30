import '@/assets/css/common/button.css';

const Button = ({ id, className, type, disabled, onClick, children, name, title }) => {

    return (
        <button 
            id={id} 
            type={type} 
            className={className} 
            onClick={onClick} 
            disabled={disabled}
            name={name}
            title={title}
            >
            {children}
        </button>
    )
}

export default Button;