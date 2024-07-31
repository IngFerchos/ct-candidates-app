
interface PropType {
    children: React.ReactElement
}
const Background: React.FC<PropType> = ({children}) => {
    return (
        <div className="bg-neutral-100 min-w-full min-h-full absolute">
            {children}
        </div>
    )
}

export {Background}