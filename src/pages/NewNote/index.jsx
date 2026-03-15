import { Link } from 'react-router-dom';
import './index.css';
import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';

function NewNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createNote = async () => {
    const result = await fetch('http://localhost:3001/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (!result.ok)
      throw new Error(`メモの作成に失敗しました: ${result.status}`);

    const data = await result.json();
    console.log('data', data);
  };

  return (
    <div className="new-note">
      <div className="new-note__header">
        <Link className="new-note__back-btn" to="/">
          <ArrowLeft className="new-note__back-icon" /> 戻る
        </Link>

        <div className="new-note__actions">
          <button className="new-note__save-btn" onClick={createNote}>
            <Save className="new-note__save-icon" />
            保存
          </button>
        </div>
      </div>

      <div className="new-note__content">
        <div className="new-note__meta">
          <div className="new-note__title-container">
            <input
              type="text"
              placeholder="タイトルを入力..."
              className="new-note__title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="new-note__editor">
          <textarea
            placeholder="メモの内容を入力してください..."
            className="new-note__textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default NewNote;
