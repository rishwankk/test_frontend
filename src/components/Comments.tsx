import React, { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { timeAgo } from "../utils/TimesAgo";
import Button from "./Button";

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
  const [newComment, setNewComment] = useState<string>("");
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [isReplying, setIsReplying] = useState<{ [key: string]: boolean }>({});
  const [editingCommentId, setEditingCommentId] = useState<number | string | null>(null);
  const [menuVisible, setMenuVisible] = useState<number | string | null>(null);

  const menuRef = useRef<Map<string, HTMLDivElement | null>>(new Map());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = Array.from(menuRef.current.values()).every(
        (ref) => ref && !ref.contains(event.target as Node)
      );
      if (clickedOutside) {
        setMenuVisible(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNewCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNewComment(e.target.value);

  const handleReplyChange = (commentId: number | string, e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setReplyText((prev) => ({ ...prev, [commentId]: e.target.value }));

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
      setNewComment("");
    }
  };

  const handleReplySubmit = (commentId: number | string) => {
    const reply = replyText[commentId]?.trim();
    if (reply) {
      const newReply: Comment = {
        id: Date.now(),
        user: "NewUser",
        profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
        text: reply,
        date: new Date().toISOString(),
        replies: [],
      };
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, newReply] }
            : comment
        )
      );
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      setIsReplying((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  const handleEditComment = (commentId: number | string) => {
    const updatedText = replyText[commentId]?.trim();
    if (updatedText) {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, text: updatedText } : comment
        )
      );
      setEditingCommentId(null);
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
    }
  };

  const renderReplies = (replies: Comment[]) =>
    replies.map((reply) => (
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
        </div>
      </div>
    ));

  return (
    <div className="w-full h-auto mt-4 rounded-xl bg-[#E1E1E133] p-4">
      <div className="mb-4">
        <textarea
          value={newComment}
          onChange={handleNewCommentChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Write a comment..."
        />
        <Button
          onClick={handleNewCommentSubmit}
          className="mt-2 bg-[#C08C5F] text-white p-2 rounded-md"
          label="Post Comment"
        />
      </div>

      {comments.map((comment) => (
        <div key={comment.id} className="p-4 flex items-start space-x-4">
          <img src={comment.profileImage} alt={comment.user} className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <div className="flex justify-between">
              <div className="font-bold font-mono">{comment.user}</div>
              <div ref={(ref) => menuRef.current.set(comment.id.toString(), ref)}>
                <BsThreeDotsVertical
                  size={14}
                  color="black"
                  onClick={() => setMenuVisible(menuVisible === comment.id ? null : comment.id)}
                />
                {menuVisible === comment.id && (
                  <div className="absolute bg-white shadow-lg rounded-md p-2 flex flex-col">
                    <Button
                      onClick={() => setEditingCommentId(comment.id)}
                      label="Edit"
                      className="shadow-lg"
                    />
                    <Button className="text-red-500 shadow-lg" label="Delete" />
                  </div>
                )}
              </div>
            </div>
            {editingCommentId === comment.id ? (
              <textarea
                value={replyText[comment.id.toString()] || comment.text}
                onChange={(e) => handleReplyChange(comment.id, e)}
                className="w-full p-2 border border-gray-300 rounded-md mt-2"
              />
            ) : (
              <div className="text-sm bg-[#ECC8AE4D] h-12 rounded-bl-2xl rounded-r-xl flex items-center w-full pl-5">
                {comment.text}
              </div>
            )}
            {editingCommentId === comment.id && (
              <Button
                onClick={() => handleEditComment(comment.id)}
                className="mt-2 bg-[#C08C5F] text-white p-2 rounded-md"
                label="Save"
              />
            )}
            {comment.replies.length > 0 && renderReplies(comment.replies)}
            <Button
              onClick={() =>
                setIsReplying((prev) => ({
                  ...prev,
                  [comment.id]: !prev[comment.id],
                }))
              }
              className="text-black text-xs mt-2 ml-4"
              label={isReplying[comment.id] ? "Cancel Reply" : "Reply"}
            />
            {isReplying[comment.id] && (
              <div className="mt-2">
                <textarea
                  value={replyText[comment.id.toString()] || ""}
                  onChange={(e) => handleReplyChange(comment.id, e)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Write a reply..."
                />
                <Button
                  onClick={() => handleReplySubmit(comment.id)}
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
