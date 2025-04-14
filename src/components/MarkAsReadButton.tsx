import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

interface MarkAsReadButtonProps {
  articleId: string;
  userId: string;
}

const MarkAsReadButton: React.FC<MarkAsReadButtonProps> = ({ articleId, userId }) => {
  const [loading, setLoading] = useState(false);
  const [marked, setMarked] = useState(false);
  const [bookmarkDocId, setBookmarkDocId] = useState<string | null>(null);

  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const q = query(
          collection(db, 'bookmarks'),
          where('userId', '==', userId),
          where('articleId', '==', articleId)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          setMarked(true);
          setBookmarkDocId(snap.docs[0].id);
        }
      } catch (err) {
        console.error('Error checking bookmark status', err);
      }
    };

    checkBookmark();
  }, [articleId, userId]);

  const handleToggleBookmark = async () => {
    setLoading(true);
    try {
      if (marked && bookmarkDocId) {
        await deleteDoc(doc(db, 'bookmarks', bookmarkDocId));
        setMarked(false);
        setBookmarkDocId(null);
        message.success('Unmarked as read');
      } else {
        const docRef = await addDoc(collection(db, 'bookmarks'), {
          userId,
          articleId,
          createdAt: new Date().toISOString()
        });
        setMarked(true);
        setBookmarkDocId(docRef.id);
        message.success('Marked as read');
      }
    } catch (err) {
      console.error(err);
      message.error('Failed to update bookmark status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type="link" onClick={handleToggleBookmark} loading={loading}>
      {marked ? 'Unmark as Read' : 'Mark as Read'}
    </Button>
  );
};

export default MarkAsReadButton;
