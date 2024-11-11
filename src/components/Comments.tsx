import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { timeAgo } from '../utils/TimesAgo';
import Button from './Button';

interface Comment {
  id: number | string;
  user: string;
  profileImage: string;
  text: string;
  date: string;
  replies: Comment[];
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [replyText, setReplyText] = useState<string>('');
  const [isReplying, setIsReplying] = useState<{ [key: number]: boolean }>({});
  const [nestedReplying, setNestedReplying] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [menuVisible, setMenuVisible] = useState<{ [key: number]: boolean }>({});
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNewCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value);
  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setReplyText(e.target.value);

  const handleNewCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentObject: Comment = {
        id: comments.length + 1,
        user: "NewUser",
        profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
        text: newComment,
        date: new Date().toISOString(),
        replies: [],
      };
      setComments([newCommentObject, ...comments]);
      setNewComment('');
    }
  };

  const handleReplySubmit = (commentId: number, replyToId: number | null = null) => {
    if (replyText.trim()) {
      const newReply: Comment = {
        id: replyToId || Date.now(),
        user: "NewUser",
        profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
        text: replyText,
        date: new Date().toISOString(),
        replies: [],
      };
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          if (replyToId) {
            const updatedReplies = comment.replies.map((reply) => {
              if (reply.id === replyToId) {
                return { ...reply, replies: [...reply.replies, newReply] };
              }
              return reply;
            });
            return { ...comment, replies: updatedReplies };
          } else {
            return { ...comment, replies: [...comment.replies, newReply] };
          }
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyText('');
      setIsReplying({});
      setNestedReplying(null);
    }
  };

  const handleEditComment = (commentId: number) => {
    const editedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, text: replyText };
      }
      return comment;
    });
    setComments(editedComments);
    setEditingCommentId(null);
    setReplyText('');
  };

  const renderReplies = (replies: Comment[], commentId: number) => {
    return replies.map((reply) => (
      <div key={reply.id} className="ml-10 mt-4 flex items-start space-x-4">
        <img src={reply.profileImage} alt={reply.user} className="w-10 h-10 rounded-full" />
        <div className="w-full">
          <div className="flex justify-between">
            <div className="font-bold font-mono">{reply.user}</div>
            <div className="text-sm text-gray-500 px-3">{timeAgo(reply.date)}</div>
          </div>
          <div className="text-xs bg-[#ECC8AE4D] w-full h-12 rounded-bl-2xl rounded-r-xl flex items-center pl-5">
            {reply.text}
          </div>
          <Button
            onClick={() => setNestedReplying(nestedReplying === reply.id ? null : reply.id as number)}
            className="text-black text-xs mt-2"
            label="Reply"
          />
          {nestedReplying === reply.id && (
            <div className="mt-2">
              <textarea
                value={replyText}
                onChange={handleReplyChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Write a reply..."
              />
              <Button onClick={() => handleReplySubmit(commentId, reply.id as number)}
                className="mt-2 bg-[#C08C5F] text-white p-2 rounded-md"
                label="Post Reply"
              />
            </div>
          )}
          {reply.replies.length > 0 && renderReplies(reply.replies, commentId)}
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full h-auto mt-4 rounded-xl bg-[#E1E1E133] p-4">
      <div className="mb-4">
        <textarea
          value={newComment}
          onChange={handleNewCommentChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Write a comment..."
        />
        <Button onClick={handleNewCommentSubmit} className="mt-2 bg-[#C08C5F] text-white p-2 rounded-md" label="Post Comment" />
      </div>

      {comments
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((comment) => (
          <div key={comment.id} className="p-4 flex items-start space-x-4">
            <img src={comment.profileImage} alt={comment.user} className="w-12 h-12 rounded-full" />
            <div className="flex-1">
              <div className="flex justify-between">
                <div className="flex">
                  <div className="font-bold font-mono">{comment.user}</div>
                  <div className="text-sm text-gray-500 px-4 pt-[2px]">{timeAgo(comment.date)}</div>
                </div>
                <div ref={menuRef}>
                  <BsThreeDotsVertical size={14} color="black" onClick={() =>
                      setMenuVisible((prev) => ({
                        ...prev,
                        [comment.id as number]: !prev[comment.id as number],
                      }))
                    } />
                  {menuVisible[comment.id as number] && (
                    <div className="absolute bg-white shadow-lg rounded-md p-2 flex flex-col">
                      <Button onClick={() => setEditingCommentId(comment.id as number)} label="Edit" className='shadow-lg' />
                      <Button className="text-red-500 shadow-lg " label="Delete"  />
                    </div>
                  )}
                </div>
              </div>
              {editingCommentId === comment.id ? (
                <textarea
                  value={replyText || comment.text}
                  onChange={handleReplyChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-2"
                />
              ) : (
                <div className="text-sm bg-[#ECC8AE4D] h-12 rounded-bl-2xl rounded-r-xl flex items-center w-full pl-5">
                  {comment.text}
                </div>
              )}
              {editingCommentId === comment.id && (
                <Button onClick={() => handleEditComment(comment.id as number)} className="mt-2 bg-[#C08C5F] text-white p-2 rounded-md " label="Save" />
              )}
              {comment.replies.length > 0 && renderReplies(comment.replies, comment.id as number)}
              <Button
                onClick={() =>
                  setIsReplying((prev) => ({
                    ...prev,
                    [comment.id as number]: !prev[comment.id as number],
                  }))
                }
                className="text-black text-xs mt-2 ml-4"
                label={isReplying[comment.id as number] ? 'Cancel Reply' : 'Reply'}
              />
              {isReplying[comment.id as number] && (
                <div className="mt-2">
                  <textarea
                    value={replyText}
                    onChange={handleReplyChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Write a reply..."
                  />
                  <Button
                    onClick={() => handleReplySubmit(comment.id as number)}
                    className="mt-2 bg-[#C08C5F] text-white p-2 rounded-md"
                    label="Post Reply"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Comments;
