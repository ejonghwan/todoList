import '@/assets/css/common/button.css';
// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//     additionalProps: string;
//   }
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    additionalProps: string;
    onClick: () => void;
  }


interface Props {
    children: React.ReactElement;
    props: ButtonProps
}

const Button = ({ children, props }: Props) => {

    return (
        <button {...props}>
            {children}
        </button>
    )
}

export default Button;