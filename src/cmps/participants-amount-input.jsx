import { HiMinus, HiPlus } from "react-icons/hi"

export function AmoutInput({ capacity, setCapacity }) {


    return <div className="participants-amount flex space-between align-center">
        <button className="flex justify-center"
            type="button"
            disabled={(capacity === 1)}
            style={{ backgroundColor: `${(capacity === 1) ? 'lightGrey' : '#0EA47A'}` }}
            onClick={() => setCapacity(prev => {
                return { ...prev, capacity: prev.capacity - 1 }
            })}><HiMinus /></button>
        <p>{capacity}</p>
        <button className="flex justify-center"
            type="button"
            disabled={(capacity === 12)}
            style={{ backgroundColor: `${(capacity === 12) ? 'lightGrey' : '#0EA47A'}` }}
            onClick={() => setCapacity(prev => {
                return { ...prev, capacity: prev.capacity + 1 }
            })}><HiPlus /></button>
    </div>
}