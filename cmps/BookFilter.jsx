import { utilService } from "../services/util.service.js"

const { useEffect, useState, useRef } = React

export function BookFilter({ filterBy, onFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const initialFilterBy = useRef({ ...filterBy })

    const onSetFilterDebounce = useRef(utilService.debounce(onFilterBy, 1500))
    // const onSetFilterDebounce = utilService.debounce(onFilterBy, 1500)

    useEffect(() => {
        onSetFilterDebounce.current(filterByToEdit)
        // onSetFilterDebounce(filterByToEdit)
        // onFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { name, type, value } = target
        if (type === 'number') value = +value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }

    function reset() {
        setFilterByToEdit(initialFilterBy.current)
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        onFilterBy(filterByToEdit)
    }

    return <section className='books-filter'>
        <h3>Filter</h3>
        <form onSubmit={onSubmitForm}>
            <input onChange={handleChange} value={filterByToEdit.title} type="text" name='title' placeholder='Insert book name' />
            <input onChange={handleChange} value={filterByToEdit.minPrice} type="number" name='minPrice' placeholder='Insert book price' />
            <button type="button" onClick={reset}>Reset</button>
            <button>Submit</button>
        </form>
    </section>
}