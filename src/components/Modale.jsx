import { useState } from 'react'
import { useNavigate } from 'react-router'
import '../sass/modale.scss'

/**
 * Component function : Modale
 * @returns a modale to display the successful action
 */
const Modale = (props) => {

    const isShown = props.viewModal
    const navigate = useNavigate()

    const [isHidden, setIsHidden] = useState(isShown) 
    
    const handleClose = () => {
        navigate(`${props.returnTo}`)
        setIsHidden(true)
    }

    return(
        <div
            id="dialog"
            role="dialog"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-desc"
            aria-modal="true"
            aria-hidden={isShown ? isHidden : !isHidden}
            tabIndex="-1"
            className="c-dialog">
            <div role="document" className="c-dialog__box">
                <button type="button" aria-label="Close" title="Close window" className="mb-3 btnClose" onClick={handleClose}>X</button>
                <h2 id="dialog-title">{props.dialogTitle}</h2>
                <p id="dialog-desc">{props.dialogDescription}</p>
            </div>
        </div>
    )
}

export default Modale