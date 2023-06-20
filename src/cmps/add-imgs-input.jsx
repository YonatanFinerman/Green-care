import { useRef, useState } from "react"
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai"

export function ImgsInput({ location, setLocation, formErrs }) {

    const [currImgIdx, setCurrImgIdx] = useState(0)

    const imgInput0 = useRef(null)
    const imgInput1 = useRef(null)
    const imgInput2 = useRef(null)

    function handleDivClick(idx) {
        const imgInput = getImgInputRef(idx)
        imgInput.current.click()
    }

    function handleFileChange(ev, idx) {

        const selectedFile = ev.target.files[0]

        if (selectedFile && selectedFile.type.includes('image')) {

            const reader = new FileReader()
            reader.onload = function (ev) {
                const url = ev.target.result
                const updatedLocation = { ...location }
                updatedLocation.imgsBefore[idx] = url
                setLocation(updatedLocation)
                setCurrImgIdx(idx)
            }
            reader.readAsDataURL(selectedFile)
        }
        return
    }

    function getImgInputRef(idx) {
        if (idx === 0) {
            return imgInput0
        }
        else if (idx === 1) {
            return imgInput1
        }
        else {
            return imgInput2
        }
    }

    return <div className="location-imgs flex">
        {(location.imgsBefore.length > 0) ? <img className="curr-img" src={location.imgsBefore[currImgIdx]} />
            : <div className="curr-img flex justify-center align-center">no selected img</div>}

        <div className="location-imgs-paging flex">
            {Array.from({ length: 3 }, (_, idx) => (
                <div className={`${(formErrs.imgErr && !location.imgsBefore[idx]) ? 'error' : ''} empty-img flex justify-center align-center`} key={'empty-img' + idx} onClick={() => handleDivClick(idx)}>
                    <input
                        type="file"
                        ref={getImgInputRef(idx)}
                        style={{ display: 'none' }}

                        onChange={(event) => handleFileChange(event, idx)}
                    />
                    {(location.imgsBefore[idx]) ? <div className="selected-img" onClick={(ev) => {
                        ev.stopPropagation()
                        setCurrImgIdx(idx)
                    }}><img src={location.imgsBefore[idx]} />
                        <button type="button" onClick={(ev) => {
                            ev.stopPropagation()
                            handleDivClick(idx)
                        }} className={"btn-clean"} ><AiOutlineClose /></button >
                    </div> : <p ><AiOutlinePlus /></p>}
                </div>))}
        </div>

    </div>
}