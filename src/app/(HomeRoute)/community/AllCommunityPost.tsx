"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  MessageCircle,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Loader2,
  Link as LinkIcon,
  Twitter,
  Facebook,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetAllCommunityPostQuery,
  useCreateCommunityPostCommentMutation,
  useCreateCommunityPostReactionMutation,
  useCreateCommentReactionMutation,
} from "@/store/features/community/community";
import PrimaryButton from "@/components/reusable/PrimaryButton";

import { useGetProfileQuery } from "@/store/features/profile/profile.api";

dayjs.extend(relativeTime);

const DEFAULT_AVATAR =
  "https://newportalbucket1122.s3.us-east-1.amazonaws.com/1760682555655-content-28efebf1-9a06-47e8-af69-25753d6584e9.jpeg";

type User = {
  id: string;
  fullName?: string;
  name?: string;
  profilePhoto?: string | null;
  avatar?: string | null;
};

type Reaction = {
  id: string;
  type: "LIKE" | "DISLIKE";
  userId: string;
};

type Comment = {
  id: string;
  content: string;
  user: User;
  createdAt: string;
  reactions?: Reaction[];
  commentLikeCount?: number;
  commentDislikeCount?: number;
};

type Post = {
  id: string;
  description: string;
  video?: string;
  image?: string;
  createdAt: string;
  user: User;
  postReactions?: Reaction[];
  postLikeCount?: number;
  postDislikeCount?: number;
  comments: Comment[];
};

const AllCommunityPost = () => {
  const { data, isLoading, isError } = useGetAllCommunityPostQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  console.log("community data", data);
  const [createCommunityPostComment] = useCreateCommunityPostCommentMutation();
  const [createCommunityPostReaction] =
    useCreateCommunityPostReactionMutation();
  const [createCommentReaction] = useCreateCommentReactionMutation();
  const { data: profileData } = useGetProfileQuery(undefined);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentUserId] = useState("current-user-id");
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [showShareOptions, setShowShareOptions] = useState<{
    [key: string]: boolean;
  }>({});
  const [reactionLoading, setReactionLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.data) {
      setPosts(data.data);
    }
  }, [data]);

  // Handle clicks outside share dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shareRef.current &&
        !shareRef.current.contains(event.target as Node)
      ) {
        setShowShareOptions({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle comments visibility
  const toggleComments = useCallback((postId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }, []);

  // Toggle share options visibility
  const toggleShareOptions = useCallback((postId: string) => {
    setShowShareOptions((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }, []);

  // Handle creating a comment
  const handleCreateComment = async (postId: string) => {
    try {
      await createCommunityPostComment({
        communityPostId: postId,
        content: newComment[postId] || "",
      }).unwrap();
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
      setErrorMessage(null);
      setShowComments((prev) => ({ ...prev, [postId]: true }));
      toast.success("Comment posted successfully!");
    } catch (error) {
      console.error("Failed to create comment:", error);
      toast.error("Failed to create comment. Please try again.");
      setErrorMessage("Failed to create comment. Please try again.");
    }
  };

  // Handle post reaction (LIKE or DISLIKE)
  const handlePostReaction = async (
    postId: string,
    type: "LIKE" | "DISLIKE"
  ) => {
    if (reactionLoading[postId]) return;
    setReactionLoading((prev) => ({ ...prev, [postId]: true }));

    try {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            const userHasLiked = post.postReactions?.some(
              (r) => r.userId === currentUserId && r.type === "LIKE"
            );
            const userHasDisliked = post.postReactions?.some(
              (r) => r.userId === currentUserId && r.type === "DISLIKE"
            );

            let updatedReactions = post.postReactions || [];
            let updatedLikeCount = post.postLikeCount || 0;
            let updatedDislikeCount = post.postDislikeCount || 0;

            if (type === "LIKE") {
              if (userHasLiked) {
                updatedReactions = updatedReactions.filter(
                  (r) => !(r.userId === currentUserId && r.type === "LIKE")
                );
                updatedLikeCount -= 1;
              } else {
                updatedReactions = updatedReactions.filter(
                  (r) => !(r.userId === currentUserId && r.type === "DISLIKE")
                );
                updatedReactions.push({
                  id: "temp",
                  type: "LIKE",
                  userId: currentUserId,
                });
                updatedLikeCount += 1;
                if (userHasDisliked) updatedDislikeCount -= 1;
              }
            } else if (type === "DISLIKE") {
              if (userHasDisliked) {
                updatedReactions = updatedReactions.filter(
                  (r) => !(r.userId === currentUserId && r.type === "DISLIKE")
                );
                updatedDislikeCount -= 1;
              } else {
                updatedReactions = updatedReactions.filter(
                  (r) => !(r.userId === currentUserId && r.type === "LIKE")
                );
                updatedReactions.push({
                  id: "temp",
                  type: "DISLIKE",
                  userId: currentUserId,
                });
                updatedDislikeCount += 1;
                if (userHasLiked) updatedLikeCount -= 1;
              }
            }

            return {
              ...post,
              postReactions: updatedReactions,
              postLikeCount: updatedLikeCount,
              postDislikeCount: updatedDislikeCount,
            };
          }
          return post;
        })
      );

      await createCommunityPostReaction({
        communityPostId: postId,
        type,
      }).unwrap();
      setErrorMessage(null);
      toast.success(
        `${type === "LIKE" ? "Liked" : "Disliked"} post successfully!`
      );
    } catch (error) {
      console.error("Failed to react to post:", error);
      toast.error("Failed to react to post. Please try again.");
      setErrorMessage("Failed to react to post. Please try again.");
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? { ...post } : post))
      );
    } finally {
      setReactionLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  // Handle comment reaction (LIKE or DISLIKE)
  const handleCommentReaction = async (
    commentId: string,
    type: "LIKE" | "DISLIKE"
  ) => {
    if (reactionLoading[commentId]) return;
    setReactionLoading((prev) => ({ ...prev, [commentId]: true }));

    try {
      setPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id === commentId) {
              const userHasLiked = comment.reactions?.some(
                (r) => r.userId === currentUserId && r.type === "LIKE"
              );
              const userHasDisliked = comment.reactions?.some(
                (r) => r.userId === currentUserId && r.type === "DISLIKE"
              );

              let updatedReactions = comment.reactions || [];
              let updatedLikeCount = comment.commentLikeCount || 0;
              let updatedDislikeCount = comment.commentDislikeCount || 0;

              if (type === "LIKE") {
                if (userHasLiked) {
                  updatedReactions = updatedReactions.filter(
                    (r) => !(r.userId === currentUserId && r.type === "LIKE")
                  );
                  updatedLikeCount -= 1;
                } else {
                  updatedReactions = updatedReactions.filter(
                    (r) => !(r.userId === currentUserId && r.type === "DISLIKE")
                  );
                  updatedReactions.push({
                    id: "temp",
                    type: "LIKE",
                    userId: currentUserId,
                  });
                  updatedLikeCount += 1;
                  if (userHasDisliked) updatedDislikeCount -= 1;
                }
              } else if (type === "DISLIKE") {
                if (userHasDisliked) {
                  updatedReactions = updatedReactions.filter(
                    (r) => !(r.userId === currentUserId && r.type === "DISLIKE")
                  );
                  updatedDislikeCount -= 1;
                } else {
                  updatedReactions = updatedReactions.filter(
                    (r) => !(r.userId === currentUserId && r.type === "LIKE")
                  );
                  updatedReactions.push({
                    id: "temp",
                    type: "DISLIKE",
                    userId: currentUserId,
                  });
                  updatedDislikeCount += 1;
                  if (userHasLiked) updatedLikeCount -= 1;
                }
              }

              return {
                ...comment,
                reactions: updatedReactions,
                commentLikeCount: updatedLikeCount,
                commentDislikeCount: updatedDislikeCount,
              };
            }
            return comment;
          }),
        }))
      );

      await createCommentReaction({
        commentId,
        type,
      }).unwrap();
      setErrorMessage(null);
      toast.success(
        `${type === "LIKE" ? "Liked" : "Disliked"} comment successfully!`
      );
    } catch (error) {
      console.error("Failed to react to comment:", error);
      toast.error("Failed to react to comment. Please try again.");
      setErrorMessage("Failed to react to comment. Please try again.");
      setPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          comments: post.comments.map((comment) =>
            comment.id === commentId ? { ...comment } : comment
          ),
        }))
      );
    } finally {
      setReactionLoading((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  // Handle share actions
  const handleShareAction = useCallback(
    (postId: string, action: "copy" | "twitter" | "facebook") => {
      const postUrl = `${window.location.origin}/community/post/${postId}`;
      const encodedUrl = encodeURIComponent(postUrl);
      const encodedTitle = encodeURIComponent("Check out this post!");

      switch (action) {
        case "copy":
          navigator.clipboard
            .writeText(postUrl)
            .then(() => {
              toast.success("Link copied to clipboard!", {
                duration: 2000,
                position: "top-center",
              });
              setShowShareOptions((prev) => ({ ...prev, [postId]: false }));
            })
            .catch(() => {
              toast.error("Failed to copy link. Please try again.", {
                duration: 2000,
                position: "top-center",
              });
            });
          break;
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            "_blank"
          );
          setShowShareOptions((prev) => ({ ...prev, [postId]: false }));
          break;
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            "_blank"
          );
          setShowShareOptions((prev) => ({ ...prev, [postId]: false }));
          break;
      }
    },
    []
  );

  // Check if user has reacted to a post or comment
  const hasUserReacted = useCallback(
    (reactions: Reaction[] | undefined, type: "LIKE" | "DISLIKE") => {
      return (
        reactions?.some((r) => r.userId === currentUserId && r.type === type) ||
        false
      );
    },
    [currentUserId]
  );

  if (isLoading) return <Loader2 className="animate-spin mx-auto mt-4" />;
  if (isError)
    return <p className="text-center text-red-600">Failed to load posts</p>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="p-4 sm:p-6">
        <h2 className="text-2xl font-semibold mb-4">Community Posts</h2>
        {posts.length === 0 && (
          <div className="bg-[#f9fbfd] p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-500">No posts found.</p>
          </div>
        )}
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-sm mb-6 rounded-md">
            <div className="flex items-center gap-3 p-4">
              <img
                src={post.user?.avatar || post.user?.profilePhoto || ""}
                alt={post.user?.fullName || "User"}
                className="w-10 h-10 rounded-lg"
                loading="lazy"
              />
              <div>
                <h3 className="font-semibold text-sm">
                  {post.user?.fullName || post.user?.name || "Unknown"}
                </h3>
                <p className="text-xs text-gray-500">
                  {dayjs(post.createdAt).fromNow()}
                </p>
              </div>
            </div>

            <div className="px-4 pb-4">
              <p className="text-gray-800 text-sm mb-3">{post.description}</p>
              <div className="h-32 md:h-64 lg:h-[24rem]">
                {post.video ? (
                  <video
                    controls
                    poster={post.image}
                    className="w-full h-full object-cover rounded-md"
                    src={post.video}
                  />
                ) : post.image ? (
                  <img
                    src={post.image}
                    alt="Post Image"
                    className="w-full h-full object-cover rounded-md"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
                    <p className="text-gray-500 text-sm">No media available</p>
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 pb-2 text-sm text-gray-500 flex items-center gap-4">
              <span className="flex items-center gap-1 cursor-pointer">
                <ThumbsUp className="w-4 h-4" /> {post.postLikeCount || 0}
              </span>
              <span className="flex items-center gap-1 cursor-pointer">
                <ThumbsDown className="w-4 h-4" /> {post.postDislikeCount || 0}
              </span>
              <span>{post.comments?.length || 0} Comments</span>
            </div>

            <div className="border-t border-b border-gray-200 flex gap-6 py-6 px-4 text-sm text-gray-600 relative">
              <button
                onClick={() => handlePostReaction(post.id, "LIKE")}
                className={`flex items-center gap-1 cursor-pointer ${
                  hasUserReacted(post.postReactions, "LIKE")
                    ? "text-blue-600"
                    : "hover:text-blue-600"
                } ${
                  reactionLoading[post.id]
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={reactionLoading[post.id]}
              >
                {reactionLoading[post.id] ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ThumbsUp className="w-4 h-4" />
                )}
                Like
              </button>
              <button
                onClick={() => handlePostReaction(post.id, "DISLIKE")}
                className={`flex items-center gap-1 cursor-pointer ${
                  hasUserReacted(post.postReactions, "DISLIKE")
                    ? "text-red-600"
                    : "hover:text-red-600"
                } ${
                  reactionLoading[post.id]
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={reactionLoading[post.id]}
              >
                {reactionLoading[post.id] ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ThumbsDown className="w-4 h-4" />
                )}
                Dislike
              </button>
              <button
                onClick={() => toggleComments(post.id)}
                className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
              >
                <MessageCircle className="w-4 h-4" /> Comment
              </button>
              <div className="relative" ref={shareRef}>
                <button
                  onClick={() => toggleShareOptions(post.id)}
                  className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
                {showShareOptions[post.id] && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => handleShareAction(post.id, "copy")}
                      className="flex items-center gap-2 w-full cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LinkIcon className="w-4 h-4" /> Copy Link
                    </button>
                    <button
                      onClick={() => handleShareAction(post.id, "twitter")}
                      className="flex items-center gap-2 w-full cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Twitter className="w-4 h-4" /> Share to Twitter
                    </button>
                    <button
                      onClick={() => handleShareAction(post.id, "facebook")}
                      className="flex items-center gap-2 w-full cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Facebook className="w-4 h-4" /> Share to Facebook
                    </button>
                  </div>
                )}
              </div>
            </div>

            {showComments[post.id] && (
              <div className="p-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 mb-3">
                    <img
                      src={
                        comment.user?.avatar || comment.user?.profilePhoto || ""
                      }
                      alt={
                        comment.user?.fullName || comment.user?.name || "User"
                      }
                      className="w-8 h-8 rounded-full"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-2 text-sm">
                        <p className="font-semibold">
                          {comment.user?.fullName ||
                            comment.user?.name ||
                            "Unknown"}
                        </p>
                        <p>{comment.content}</p>
                      </div>
                      <div className="text-xs text-gray-500 flex gap-3 mt-1">
                        <span>{dayjs(comment.createdAt).fromNow()}</span>
                        <button
                          onClick={() =>
                            handleCommentReaction(comment.id, "LIKE")
                          }
                          className={`hover:text-blue-600 ${
                            hasUserReacted(comment.reactions, "LIKE")
                              ? "text-blue-600"
                              : ""
                          } ${
                            reactionLoading[comment.id]
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={reactionLoading[comment.id]}
                        >
                          {reactionLoading[comment.id] ? (
                            <Loader2 className="w-4 h-4 animate-spin inline" />
                          ) : (
                            "Like"
                          )}{" "}
                          ({comment.commentLikeCount || 0})
                        </button>
                        <button
                          onClick={() =>
                            handleCommentReaction(comment.id, "DISLIKE")
                          }
                          className={`hover:text-red-600 ${
                            hasUserReacted(comment.reactions, "DISLIKE")
                              ? "text-red-600"
                              : ""
                          } ${
                            reactionLoading[comment.id]
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={reactionLoading[comment.id]}
                        >
                          {reactionLoading[comment.id] ? (
                            <Loader2 className="w-4 h-4 animate-spin inline" />
                          ) : (
                            "Dislike"
                          )}{" "}
                          ({comment.commentDislikeCount || 0})
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 mt-3">
                  <img
                    src={profileData?.profilePhoto || ""}
                    alt="Current user"
                    className="w-8 h-8 rounded-full"
                    loading="lazy"
                  />
                  <input
                    type="text"
                    value={newComment[post.id] || ""}
                    onChange={(e) =>
                      setNewComment({
                        ...newComment,
                        [post.id]: e.target.value,
                      })
                    }
                    placeholder="Write a comment..."
                    className="flex-1 bg-gray-100 rounded-full px-4 py-1.5 text-sm focus:outline-none"
                  />
                  <PrimaryButton
                    title="Comment"
                    onClick={() => handleCreateComment(post.id)}
                    className=""
                    disabled={!newComment[post.id]?.trim()}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCommunityPost;
