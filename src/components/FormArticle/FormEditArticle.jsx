import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'

import { fetchArticle } from '../PostList/postListSlice'

import style from './formNewArticle.module.css'

export default function FormEditArticle() {
  const dispatch = useDispatch()

  const token = useSelector((state) => state.user.user.token)
  const { title, description, body: text, tagList, slug } = useSelector((state) => state.postList.article.article)

  const [tagValues, setTagValues] = useState(tagList || [''])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title,
      description,
      text,
    },
  })

  const onSubmit = (data) => {
    const dataForm = {
      resource: `articles/${slug}`,
      method: 'PUT',
      token,
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: tagValues,
      },
    }
    dispatch(fetchArticle(dataForm))
  }

  const createTagInput = (index) => (
    <input
      className={classNames(style['text-input'], style.tag)}
      type="text"
      placeholder="Tag"
      value={tagValues[index]}
      onChange={(event) =>
        setTagValues((tagValues) => tagValues.map((tag, idx) => (idx === index ? event.target.value : tag)))
      }
    />
  )

  const createTagControls = (number) => {
    const tagControls = []

    for (let i = 0; i < number; i++) {
      const btnAddTag = (
        <button type="button" className={style['btn-add-tag']} onClick={() => setTagValues([...tagValues, ''])}>
          Add tag
        </button>
      )
      const btnDeleteTag = (
        <button
          type="button"
          className={style['btn-delete-tag']}
          onClick={() => setTagValues([...tagValues.slice(0, i), ...tagValues.slice(i + 1)])}
        >
          Delete
        </button>
      )
      const tagControl = (
        <div key={i}>
          {createTagInput(i)}
          {(i > 0 || number > 1) && btnDeleteTag}
          {i === number - 1 && btnAddTag}
        </div>
      )
      tagControls.push(tagControl)
    }

    return tagControls
  }
  return (
    <div className={style['new-article-container']}>
      <h3 className={style.title}>Create new article</h3>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={style['text-label']} htmlFor="title">
          Title
        </label>
        <input
          className={classNames(style['text-input'], { [style['error-input']]: errors.title })}
          type="text"
          id="title"
          placeholder="Title"
          {...register('title', {
            required: 'This field is required',
          })}
        />
        {errors.title && <span className={style.message}>{errors.title.message || 'Error'}</span>}

        <label className={style['text-label']} htmlFor="description">
          Short description
        </label>
        <input
          className={classNames(style['text-input'], { [style['error-input']]: errors.description })}
          type="text"
          id="description"
          placeholder="Short description"
          {...register('description', {
            required: 'This field is required',
          })}
        />
        {errors.description && <span className={style.message}>{errors.description.message || 'Error'}</span>}

        <label className={style['text-label']} htmlFor="text">
          Text
        </label>
        <textarea
          className={classNames(style['text-input'], { [style['error-input']]: errors.text })}
          id="text"
          placeholder="Text"
          {...register('text', {
            required: 'This field is required',
          })}
        />
        {errors.text && <span className={style.message}>{errors.text.message || 'Error'}</span>}

        <span className={style['text-label']}>Tags</span>
        {createTagControls(tagValues.length)}
        <button className={style.btn} type="submit">
          Send
        </button>
      </form>
    </div>
  )
}
