const Button = ({
    children,
    image,
    onClick,
}:{
    children: React.ReactNode, 
    onClick?: () => void,
    image?: string
}) => (
    <button className="bg-white p-4 text-lg font-bold flex justify-center items-center gap-3 rounded-lg" onClick={onClick}>
        {image && <img src={image} className="w-10"/> }
        {children}
    </button>
)

export default Button
