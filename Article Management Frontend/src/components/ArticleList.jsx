import React, { useState, useEffect } from 'react';
import { fetchArticles, likeArticle, updateArticle, deleteArticle } from '../api';
import '../App.css';  

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedArticle, setEditedArticle] = useState({
    title: '',
    image: '',
    video: '',
    description: '',
    text: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortCriteria, setSortCriteria] = useState('likes'); 
  const [ascending, setAscending] = useState(true); 

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetchArticles();
        const sortedArticles = sortArticles(response.data);
        setArticles(sortedArticles);
      } catch (error) {
        setError('Failed to fetch articles.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, [sortCriteria, ascending]); 

  const sortArticles = (articles) => {
    return articles.sort((a, b) => {
      const order = ascending ? 1 : -1;

      if (sortCriteria === 'likes') {
        return (a.likes - b.likes) * order;
      } else if (sortCriteria === 'date') {
        return (new Date(a.publishDate) - new Date(b.publishDate)) * order;
      }
      return 0;
    });
  };

  const handleLike = async (id) => {
    try {
      await likeArticle(id);
      const updatedArticles = articles.map(article =>
        article._id === id ? { ...article, likes: article.likes + 1 } : article
      );
      setArticles(updatedArticles);
    } catch (error) {
      setError('Failed to like the article.');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      const updatedArticles = articles.filter(article => article._id !== id);
      setArticles(updatedArticles);
    } catch (error) {
      setError('Failed to delete the article.');
      console.error(error);
    }
  };

  const handleEdit = (article) => {
    setEditMode(article._id);
    setEditedArticle({
      title: article.title,
      image: article.image,
      video: article.video,
      description: article.description,
      text: article.text
    });
  };

  const handleUpdate = async (id) => {
    try {
      await updateArticle(id, editedArticle);
      const updatedArticles = articles.map(article =>
        article._id === id ? { ...article, ...editedArticle } : article
      );
      setArticles(updatedArticles);
      setEditMode(null);  
    } catch (error) {
      setError('Failed to update the article.');
      console.error(error);
    }
  };

  return (
    <div className="container">
      {loading && <p>Loading articles...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Dropdown for Sorting Criteria */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <select
            className="form-select me-2"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="likes">Sort by Likes</option>
            <option value="date">Sort by Date</option>
          </select>

          {/* Dropdown for Ascending/Descending */}
          <select
            className="form-select"
            value={ascending ? 'asc' : 'desc'}
            onChange={(e) => setAscending(e.target.value === 'asc')}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="row">
        {articles.map(article => (
          <div className="col-md-4" key={article._id}>
            <div className="card mb-3">
              {article.image && (
                <img src={article.image} className="card-img-top article-image" alt={article.title} />
              )}
              <div className="card-body">
                {editMode === article._id ? (
                  <>
                    <input
                      type="text"
                      value={editedArticle.title}
                      onChange={(e) => setEditedArticle({ ...editedArticle, title: e.target.value })}
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      value={editedArticle.image}
                      onChange={(e) => setEditedArticle({ ...editedArticle, image: e.target.value })}
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      value={editedArticle.video}
                      onChange={(e) => setEditedArticle({ ...editedArticle, video: e.target.value })}
                      className="form-control mb-2"
                    />
                    <textarea
                      value={editedArticle.description}
                      onChange={(e) => setEditedArticle({ ...editedArticle, description: e.target.value })}
                      className="form-control mb-2"
                    />
                    <textarea
                      value={editedArticle.text}
                      onChange={(e) => setEditedArticle({ ...editedArticle, text: e.target.value })}
                      className="form-control mb-2"
                    />
                    <button className="btn btn-success btn-gap" onClick={() => handleUpdate(article._id)}>
                      Update
                    </button>
                    <button className="btn btn-secondary" onClick={() => setEditMode(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.description}</p>
                    <p className="card-text">{article.text}</p>
                    <button className="btn btn-primary btn-gap" onClick={() => handleLike(article._id)}>
                      Like ({article.likes})
                    </button>
                    <button className="btn btn-warning btn-gap" onClick={() => handleEdit(article)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(article._id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
              <div className="card-footer text-muted">
                {new Date(article.publishDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
