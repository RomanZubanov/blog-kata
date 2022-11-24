import style from './favorite.module.css'
import heart from './heart.svg'
import redHeart from './redHeart.svg'

function Favorite({ favorited, favoritesCount, onFavorite, slug }) {
  const heartSrc = favorited ? redHeart : heart
  const method = favorited ? 'DELETE' : 'POST'
  return (
    <div className={style.favoritesCount}>
      <button type="button" onClick={() => onFavorite(slug, method)}>
        <img src={heartSrc} alt="favorite count" />
      </button>
      <span>{favoritesCount}</span>
    </div>
  )
}

export default Favorite
