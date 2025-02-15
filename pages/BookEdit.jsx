import { AddGoogleBook } from "../cmps/AddGoogleBook.jsx"
import { booksService } from "../services/books.service.js"
import { showErrorMsg } from '../services/event-bus.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

const { useParams, useNavigate } = ReactRouter

const { useState, useEffect } = React

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(booksService.getEmptyBook())
    console.log('bookToEdit:', bookToEdit)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!params.bookId) return

        loadBook()
    }, [])

    function loadBook() {
        booksService.get(params.bookId)
            .then(setBookToEdit)
    }

    function onSave(ev) {
        ev.preventDefault()

        booksService.save(bookToEdit)
            .then(() => showSuccessMsg('Book has successfully saved!'))
            .catch(() => showErrorMsg(`couldn't save book`))
            .finally(() => navigate('/book'))
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setBookToEdit(prevBook => ({ ...prevBook, [prop]: value }))
    }

    function handleChangeListPrice({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }

        setBookToEdit(prevBook => ({
            ...prevBook,
            listPrice: { ...prevBook.listPrice, [prop]: value }
        }))
    }

    const { title, authors, listPrice, description, pageCount } = bookToEdit

    return <section className='book-edit'>
        <h2>{params.bookId ? 'Edit' : 'Add'} Book</h2>

        {!params.bookId && <AddGoogleBook />}

        <form onSubmit={onSave}>
            <label className='bold-txt' htmlFor="title">Title: </label>
            <input onChange={handleChange} value={title} id='title' type="text" name='title' />

            <label className='bold-txt' htmlFor="authors">Authors: </label>
            <input onChange={handleChange} value={authors} id='authors' type="text" name='authors' />

            <label className='bold-txt' htmlFor="description">Description: </label>
            <input onChange={handleChange} value={description} id='description' type="text" name='description' />

            <label className='bold-txt' htmlFor="pages">Number of pages: </label>
            <input onChange={handleChange} value={pageCount} id='pages' type="number" name='pageCount' />

            <label className='bold-txt' htmlFor="price">Price: </label>
            <input onChange={handleChangeListPrice} value={listPrice.amount} id='price' type="number" name='amount' />

            <label className='bold-txt' htmlFor="isOnSale">On Sale: </label>
            <input onChange={handleChangeListPrice} checked={listPrice.isOnSale} id='isOnSale' type="checkbox" name='isOnSale' />

            <button>Save</button>
        </form>
    </section>
}