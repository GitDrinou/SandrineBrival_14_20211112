import '../sass/modale.scss'

/**
 * Component function : Modale
 * @returns a modale to display the successful action
 */
const Modale = () => {

    return(
        <div
            id="dialog"
            role="dialog"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-desc"
            aria-modal="true"
            aria-hidden="true"
            tabIndex="-1"
            className="c-dialog">
            <div role="document" className="c-dialog__box">
                <button type="button" aria-label="Close" title="Close window" className="mb-3 btnClose" data-dismiss="dialog">X</button>
                <h2 id="dialog-title">Employee created</h2>
                <p id="dialog-desc">A new employee have been successfully created on your database.</p>
            </div>
        </div>
    )
}

export default Modale